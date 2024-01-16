import PropTypes from 'prop-types';
import useCompleteAppointmentMutation from '@queries/appointment/useCompleteAppointmentMutation.hook';
import CompleteAppointmentForm from '@components/CompleteAppointmentForm';
import { APPOINTMENT_STATUS } from 'shared/src/utils/constants';

const CompleteAppointment = ({ onCloseModal, appointment }) => {
    const completeAppointment = useCompleteAppointmentMutation();

    const handleCompleteAppointment = ({ code }) => {
        completeAppointment.mutate(
            {
                appointmentId: appointment.id,
                appointment: {
                    status: APPOINTMENT_STATUS.FINISHED,
                },
                code,
            },
            {
                onSuccess: () => {
                    onCloseModal();
                },
            },
        );
    };

    return (
        <CompleteAppointmentForm
            isEdit
            onSubmit={handleCompleteAppointment}
            isLoading={completeAppointment.isLoading}
        />
    );
};

CompleteAppointment.propTypes = {
    onCloseModal: PropTypes.func.isRequired,
    appointment: PropTypes.shape({
        id: PropTypes.string.isRequired,
        code: PropTypes.string.isRequired,
    }).isRequired,
};

CompleteAppointment.defaultProps = {
    onCloseModal: () => {},
};

export default CompleteAppointment;
