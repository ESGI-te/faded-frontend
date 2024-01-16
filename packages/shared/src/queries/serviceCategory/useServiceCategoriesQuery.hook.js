import { useQuery } from "@tanstack/react-query";
import { getServiceCategories } from "../../api";
import serviceCategoryKeys from "./serviceCategoryKeys";

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
