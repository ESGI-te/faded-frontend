import { useQuery } from '@tanstack/react-query';
import { getServiceCategories } from '@/api/api';
import serviceCategoryKeys from '@/queries/serviceCategory/serviceCategoryKeys';

const queryFn = async () => {
    const data = await getServiceCategories();

    return data;
};

const useServiceCategoriesQuery = () => {
    return useQuery({
        queryKey: serviceCategoryKeys.all(),
        queryFn,
    });
};

export default useServiceCategoriesQuery;
