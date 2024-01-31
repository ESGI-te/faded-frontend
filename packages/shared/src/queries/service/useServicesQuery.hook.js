import { useQuery } from "@tanstack/react-query";
import { getServices } from "../../api";
import serviceKeys from "./serviceKeys";

const queryFn = async ({
	queryKey: [{ scope, entity, page, perPage, ...q }],
}) => {
	const data = await getServices({ page, perPage, ...q });

	return data;
};

const useServicesQuery = ({ ...q }) => {
	return useQuery({
		queryKey: serviceKeys.list({ ...q }),
		queryFn,
	});
};

export default useServicesQuery;
