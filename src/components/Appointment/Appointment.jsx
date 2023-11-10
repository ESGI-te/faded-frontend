import PropTypes from 'prop-types';
import AppointmentForm from '@components/AppointmentForm';
import { useEstablishmentAppointment } from '@contexts/EstablishmentAppointmentProvider';
import { useMemo } from 'react';

const Appointment = ({ establishment }) => {
    const { selectedService } = useEstablishmentAppointment();
    const formattedBarbers = useMemo(
        () => establishment.barbers.map((barber) => ({ id: barber.id, name: barber.firstName })),
        [establishment.barbers],
    );

    return (
        <AppointmentForm
            service={selectedService}
            services={establishment.services}
            barbers={formattedBarbers}
        />
    );
};

Appointment.propTypes = {
    establishment: PropTypes.shape({
        services: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
                duration: PropTypes.number.isRequired,
                price: PropTypes.number.isRequired,
                category: PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    name: PropTypes.string.isRequired,
                }),
            }),
        ).isRequired,
        barbers: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                firstName: PropTypes.string.isRequired,
                lastName: PropTypes.string.isRequired,
            }),
        ).isRequired,
    }).isRequired,
};

export default Appointment;
