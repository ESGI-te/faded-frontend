import { updateEstablishment } from '@api/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import establishmentKeys from 'shared/src/queries/establishment/establishmentKeys';

const mutationFn = async ({ establishmentId, establishment }) => {
    const data = await updateEstablishment({
        establishmentId,
        establishment,
    });
    return data;
};

const useUpdateEstablishmentMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn,
        onSuccess: (data, { establishmentId }) => {
            return queryClient.invalidateQueries({
                queryKey: establishmentKeys.detailById(establishmentId),
            });
        },
    });
};

export default useUpdateEstablishmentMutation;
