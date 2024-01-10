import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateAppointment } from '@api/api';
import appointmentKeys from './appointmentKeys';

const mutationFn = async ({ appointmentId, appointment, code }) => {
    const data = await updateAppointment({ appointmentId, appointment }, { code });
    return data;
};

const useCompleteAppointmentMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn,
        onSuccess: (data) =>
            queryClient.invalidateQueries({
                queryKey: appointmentKeys.list(),
            }),
    });
};

export default useCompleteAppointmentMutation;
