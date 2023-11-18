import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAppointment } from '@api/api';
import appointmentKeys from './appointmentKeys';

const mutationFn = async (appointment) => {
    const data = await createAppointment(appointment);
    return data;
};

const useCreateAppointmentMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn,
        // onSuccess: (data) =>
        //     queryClient.invalidateQueries({
        //         queryKey: appointmentKeys.detail(),
        //     }),
    });
};

export default useCreateAppointmentMutation;
