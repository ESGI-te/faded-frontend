import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateServiceCategory } from '@api/api';
import serviceCategoryKeys from 'shared/src/queries/serviceCategory/serviceCategoryKeys';

const mutationFn = async ({ serviceCategoryId, serviceCategory }) => {
    const data = await updateServiceCategory(serviceCategoryId, serviceCategory);
    return data;
};

const useUpdateServiceCategoryMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: serviceCategoryKeys.allLists() });
        },
    });
};

export default useUpdateServiceCategoryMutation;
