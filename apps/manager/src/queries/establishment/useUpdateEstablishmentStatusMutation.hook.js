import { updateEstablishmentStatus } from '@api/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import establishmentKeys from 'shared/src/queries/establishment/establishmentKeys';

const mutationFn = async ({ establishmentId, status }) => {
    const data = await updateEstablishmentStatus({
        establishmentId,
        status,
    });
    return data;
};

const useUpdateEstablishmentStatusMutation = () => {
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

export default useUpdateEstablishmentStatusMutation;
