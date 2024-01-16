import { useQuery } from "@tanstack/react-query";
import { getBarbers } from "../../api";
import barberKeys from "./barberKeys";

const queryFn = async ({
	queryKey: [{ page, perPage, entity, scope, ...q }],
}) => {
	const data = await getBarbers({ page, perPage, ...q });
	return data;
};

const useBarbersQuery = ({ page = 1, perPage = 10, ...q } = {}) => {
	return useQuery({
		queryKey: barberKeys.list({ page, perPage, ...q }),
		queryFn,
	});
};

export default useBarbersQuery;