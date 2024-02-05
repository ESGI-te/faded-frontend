import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateEstablishmentImage } from '@api/api';
import establishmentKeys from 'shared/src/queries/establishment/establishmentKeys';

const mutationFn = async ({ establishmentId, image }) => {
    const data = await updateEstablishmentImage(establishmentId, image);
    return data;
};

const useUpdateEstablishmentImageMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn,
        onSuccess: (data, { establishmentId }) => {
            queryClient.invalidateQueries({
                queryKey: establishmentKeys.detailById(establishmentId),
            });
        },
    });
};

export default useUpdateEstablishmentImageMutation;
