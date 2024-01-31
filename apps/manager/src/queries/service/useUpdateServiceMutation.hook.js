import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateService } from '@api/api';
import serviceKeys from 'shared/src/queries/service/serviceKeys';

const mutationFn = async ({ serviceId, service }) => {
    const data = await updateService(serviceId, service);
    return data;
};

const useUpdateServiceMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: serviceKeys.list() });
        },
    });
};

export default useUpdateServiceMutation;
