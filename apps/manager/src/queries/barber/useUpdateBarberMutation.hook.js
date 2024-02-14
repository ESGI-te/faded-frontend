import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBarber } from '@api/api';
import barberKeys from 'shared/src/queries/barber/barberKeys';

const mutationFn = async ({ barberId, barber }) => {
    const data = await updateBarber(barberId, barber);
    return data;
};

const useUpdateBarberMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: barberKeys.allLists() });
        },
    });
};

export default useUpdateBarberMutation;
