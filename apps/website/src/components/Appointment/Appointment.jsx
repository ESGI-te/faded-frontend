import PropTypes from 'prop-types';
import AppointmentForm from '@components/AppointmentForm';
import { useEstablishmentAppointment } from '@contexts/EstablishmentAppointmentProvider';
import useCreateAppointmentMutation from '@queries/appointment/useCreateAppointmentMutation.hook';
import { useParams } from 'react-router-dom';
import useBarbersQuery from 'shared/src/queries/barber/useBarbersQuery.hook';
import { useNavigate } from 'react-router-dom';

const Appointment = ({ establishment }) => {
    const { establishmentId } = useParams();
    const { selectedService } = useEstablishmentAppointment();
    const { data: barbers } = useBarbersQuery({
        establishment: establishmentId,
        pagination: false,
    });
    const appointmentMutation = useCreateAppointmentMutation();
    const navigate = useNavigate();

    const handleCreateAppointment = (data) => {
        const formattedData = {
            establishment: establishmentId,
            service: data.service.id,
            dateTime: data.dateTime,
            barber: data.barber || null,
        };
        appointmentMutation.mutate(formattedData, {
            onSuccess: (appointment) => {
                navigate(`/appointment/${appointment.id}/success`);
            },
        });
    };

    return (
        <AppointmentForm
            service={selectedService}
            services={establishment.services}
            barbers={barbers || []}
            onSubmit={handleCreateAppointment}
            isLoading={appointmentMutation.isLoading}
        />
    );
};

Appointment.propTypes = {
    establishment: PropTypes.shape({
        services: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
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
                id: PropTypes.string.isRequired,
                firstName: PropTypes.string.isRequired,
                lastName: PropTypes.string.isRequired,
            }),
        ).isRequired,
    }).isRequired,
};

export default Appointment;
