import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createService } from '@api/api';
import serviceKeys from 'shared/src/queries/service/serviceKeys';

const mutationFn = async (service) => {
    const data = await createService(service);
    return data;
};

const useCreateServiceMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn,
        onSuccess: (data) => queryClient.invalidateQueries({ queryKey: serviceKeys.list() }),
    });
};

export default useCreateServiceMutation;
