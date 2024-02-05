import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEstablishment } from '@api/api';
import establishmentKeys from 'shared/src/queries/establishment/establishmentKeys';

const mutationFn = async (establishment) => {
    const data = await createEstablishment(establishment);
    return data;
};

const useCreateEstablishmentMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: establishmentKeys.list() });
        },
    });
};

export default useCreateEstablishmentMutation;
