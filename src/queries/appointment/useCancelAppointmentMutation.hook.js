import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelAppointment } from '@api/api';
import appointmentKeys from './appointmentKeys';
import { APPOINTMENT_STATUS } from '@utils/constants';

const mutationFn = async (appointmentId) => {
    const data = await cancelAppointment({ appointmentId, status: APPOINTMENT_STATUS.CANCELED });
    return data;
};

const useCancelAppointmentMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn,
        onSuccess: (data, { appointmentId }) =>
            queryClient.invalidateQueries({
                queryKey: appointmentKeys.detailById(appointmentId),
            }),
    });
};

export default useCancelAppointmentMutation;