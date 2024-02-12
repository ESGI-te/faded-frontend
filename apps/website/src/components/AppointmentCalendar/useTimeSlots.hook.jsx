import useAppointmentsQuery from 'shared/src/queries/appointment/useAppointmentsQuery.hook';
import useBarbersQuery from 'shared/src/queries/barber/useBarbersQuery.hook';
import { dayjs } from '@utils/dayjs';
import { useParams } from 'react-router-dom';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const TIME_SLOT_DURATION = 30;

const useTimeSlots = (date, planning, barberId) => {
    const { establishmentId } = useParams();
    const { data: appointments, isLoading } = useAppointmentsQuery({
        pagination: false,
        establishment: establishmentId,
    });
    const { data: barbers } = useBarbersQuery({
        pagination: false,
        establishment: establishmentId,
    });

    if (!planning || !planning.isOpen)
        return {
            timeSlots: [],
            isLoading: false,
            unavailableTimeSlots: [],
        };

    const timeSlots = [];

    const fullOpeningDateTime = dayjs(date)
        .set('hour', dayjs(planning.open, 'HH:mm').hour())
        .set('minute', dayjs(planning.open, 'HH:mm').minute());
    const fullClosingDateTime = dayjs(date)
        .set('hour', dayjs(planning.close, 'HH:mm').hour())
        .set('minute', dayjs(planning.close, 'HH:mm').minute());

    let openingTime = fullOpeningDateTime;
    const closingTime = fullClosingDateTime;
    const unavailableTimeSlots = [];
    const currentTime = dayjs();

    while (openingTime.isSameOrBefore(closingTime)) {
        const timeSlot = openingTime.format('HH:mm');

        if (openingTime.isBefore(currentTime)) {
            unavailableTimeSlots.push(timeSlot);
        }

        const appointmentsForSlot = appointments?.filter((appointment) => {
            const appointmentStart = dayjs(appointment.dateTime);
            const appointmentEnd = appointmentStart.add(appointment.service.duration, 'minutes');

            const isBooked =
                openingTime.isSame(appointmentStart) ||
                openingTime.isBetween(appointmentStart, appointmentEnd);
            console.log(openingTime.isBefore(currentTime));
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
