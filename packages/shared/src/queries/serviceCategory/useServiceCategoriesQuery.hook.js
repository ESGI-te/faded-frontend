import { useQuery } from "@tanstack/react-query";
import { getServiceCategories } from "../../api";
import serviceCategoryKeys from "./serviceCategoryKeys";

const queryFn = async ({
	queryKey: [{ page, perPage, entity, scope, ...q }],
}) => {
	const data = await getServiceCategories({ page, perPage, ...q });
	return data;
};

const useServiceCategoriesQuery = ({ ...q } = {}) => {
	return useQuery({
		queryKey: serviceCategoryKeys.list({ ...q }),
		queryFn,
	});
};

export default useServiceCategoriesQuery;
