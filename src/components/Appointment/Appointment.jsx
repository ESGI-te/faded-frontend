import PropTypes from 'prop-types';
import AppointmentForm from '@components/AppointmentForm';
import { useEstablishmentAppointment } from '@contexts/EstablishmentAppointmentProvider';
import useCreateAppointmentMutation from '@queries/appointment/useCreateAppointmentMutation.hook';
import { useParams } from 'react-router-dom';
import useUserQuery from '@queries/user/useUserQuery.hook';
import useEstablishmentBarbersQuery from '@queries/barber/useEstablishmentBarbersQuery.hook';

const Appointment = ({ establishment }) => {
    const { establishmentId } = useParams();
    const { selectedService } = useEstablishmentAppointment();
    const { data: user } = useUserQuery();
    const { data: barbers } = useEstablishmentBarbersQuery(establishmentId);
    const appointmentMutation = useCreateAppointmentMutation();

    const handleCreateAppointment = (data) => {
        const formattedData = {
            establishment: establishmentId,
            service: data.service.id,
            barber: data.barber,
            dateTime: data.dateTime,
            user: user?.id,
        };
        appointmentMutation.mutate(formattedData);
    };

    return (
        <AppointmentForm
            service={selectedService}
            services={establishment.services}
            barbers={barbers}
            onSubmit={handleCreateAppointment}
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
