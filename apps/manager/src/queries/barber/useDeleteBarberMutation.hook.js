import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBarber } from '@api/api';
import barberKeys from 'shared/src/queries/barber/barberKeys';

const mutationFn = async (barberId) => {
    const data = await deleteBarber(barberId);
    return data;
};

const useDeleteBarberMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn,
        onSuccess: (data) =>
            queryClient.invalidateQueries({
                queryKey: barberKeys.list(),
            }),
    });
};

export default useDeleteBarberMutation;
