import { useMutation } from '@tanstack/react-query';
import { createAppointment } from '@api/api';

const mutationFn = async (appointment) => {
    const data = await createAppointment(appointment);
    return data;
};

const useCreateAppointmentMutation = () => {
    return useMutation({
        mutationFn,
    });
};

export default useCreateAppointmentMutation;
