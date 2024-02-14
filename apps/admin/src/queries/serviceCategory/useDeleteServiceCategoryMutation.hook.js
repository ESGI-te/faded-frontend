import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteServiceCategory } from "../../api";
import serviceCategoryKeys from 'shared/src/queries/serviceCategory/serviceCategoryKeys';

const mutationFn = async (serviceCategoryId) => {
	const data = await deleteServiceCategory(serviceCategoryId);
	return data;
};

const useDeleteServiceCategoryMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn,
		onSuccess: (data) =>
			queryClient.invalidateQueries({
				queryKey: serviceCategoryKeys.allLists(),
			}),
	});
};

export default useDeleteServiceCategoryMutation;
