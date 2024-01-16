import useAppointmentsQuery from 'shared/src/queries/appointment/useAppointmentsQuery.hook';
import useBarbersQuery from 'shared/src/queries/barber/useBarbersQuery.hook';
import { dayjs } from '@utils/dayjs';
import { isEmpty } from 'lodash';
import { useParams } from 'react-router-dom';

const TIME_SLOT_DURATION = 30;

const useTimeSlots = (date, planning, barberId) => {
    const { establishmentId } = useParams();
    const { data: appointments, isLoading } = useAppointmentsQuery({
        establishment: establishmentId,
    });
    const { data: barbers } = useBarbersQuery({
        pagination: false,
        establishment: establishmentId,
    });

    if (isEmpty(planning)) return [];

    const timeSlots = [];

    const fullOpeningDateTime = dayjs(date)
        .set('hour', dayjs(planning.open).hour())
        .set('minute', dayjs(planning.open).minute());
    const fullClosingDateTime = dayjs(date)
        .set('hour', dayjs(planning.close).hour())
        .set('minute', dayjs(planning.close).minute());

    let openingTime = fullOpeningDateTime;
    const closingTime = fullClosingDateTime;
    const unavailableTimeSlots = [];

    while (openingTime.isSameOrBefore(closingTime)) {
        const timeSlot = openingTime.format('HH:mm');

        const appointmentsForSlot = appointments?.filter((appointment) => {
            const appointmentStart = dayjs(appointment.dateTime);
            const appointmentEnd = appointmentStart.add(appointment.service.duration, 'minutes');

            const isBooked =
                openingTime.isSame(appointmentStart) ||
                openingTime.isBetween(appointmentStart, appointmentEnd);

            if (barberId && isBooked && appointment.barber.id === barberId) {
                unavailableTimeSlots.push(timeSlot);
            }

            return isBooked;
        });

        if (appointmentsForSlot?.length < barbers?.length) {
            timeSlots.push(timeSlot);
        }

        openingTime = openingTime.add(TIME_SLOT_DURATION, 'minutes');
    }

    return { timeSlots, isLoading, unavailableTimeSlots };
};

export default useTimeSlots;
