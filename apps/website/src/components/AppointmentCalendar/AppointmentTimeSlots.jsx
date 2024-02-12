import { useMemo } from 'react';
import PropTypes from 'prop-types';
import AppointmentTimeSlotList from './AppointmentTimeSlotList';
import useBarbersQuery from 'shared/src/queries/barber/useBarbersQuery.hook';
import { useFormContext } from 'react-hook-form';
import { useEstablishment } from '@contexts/EstablishmentAppointmentProvider';
import { getDayOfWeek } from '@internationalized/date';
import useTimeSlots from './useTimeSlots.hook';
import { useParams } from 'react-router-dom';
import { useLocale } from 'react-aria';

const AppointmentTimeSlots = ({ date, isDisabled, isUnavailable, ...props }) => {
    const { establishmentId } = useParams();
    const barbers = useBarbersQuery({ establishment: establishmentId });
    const { establishment } = useEstablishment();
    const { watch } = useFormContext();
    const barberId = watch('barber');
    const planning = useMemo(() => {
        if (!barberId) return establishment.planning;
        return barbers.data?.data?.find((barber) => barber.id === barberId)?.planning;
    }, [barberId, barbers, establishment.planning]);

    const { locale } = useLocale();
    const dayPlanning = Object.entries(planning)[getDayOfWeek(date, locale)]?.[1];

    const {
        timeSlots,
        unavailableTimeSlots,
        isLoading: timeSlotsIsLoading,
    } = useTimeSlots(date, dayPlanning, barberId);

    if (isDisabled || isUnavailable || !timeSlots) return null;

    if (timeSlotsIsLoading || (barberId && barbers.isLoading)) return <p>Is loading...</p>; // TODO: Add skeleton

    return (
        <AppointmentTimeSlotList
            timeSlots={timeSlots}
            unavailableTimeSlots={unavailableTimeSlots}
            date={date}
            {...props}
        />
    );
};

AppointmentTimeSlots.propTypes = {
    date: PropTypes.object.isRequired,
    isUnavailable: PropTypes.bool,
    isDisabled: PropTypes.bool,
};

export default AppointmentTimeSlots;
