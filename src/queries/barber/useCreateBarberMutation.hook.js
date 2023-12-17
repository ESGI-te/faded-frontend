import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBarber } from '@api/api';
import barberKeys from './barberKeys';

const mutationFn = async (barber) => {
    const data = await createBarber(barber);
    return data;
};

const useCreateBarberMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn,
        onSuccess: (data) =>
            queryClient.invalidateQueries({
                queryKey: barberKeys.list(),
            }),
    });
};

export default useCreateBarberMutation;
