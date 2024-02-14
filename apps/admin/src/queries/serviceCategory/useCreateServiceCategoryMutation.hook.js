import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createServiceCategory } from '@api/api';
import serviceCategoryKeys from 'shared/src/queries/serviceCategory/serviceCategoryKeys';

const mutationFn = async (serviceCategory) => {
    const data = await createServiceCategory(serviceCategory);
    return data;
};

const useCreateServiceCategoryMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn,
        onSuccess: (data) => queryClient.invalidateQueries({ queryKey: serviceCategoryKeys.allLists() }),
    });
};

export default useCreateServiceCategoryMutation;
