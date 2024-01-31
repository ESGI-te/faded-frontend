import { useQuery } from "@tanstack/react-query";
import { getBarbers } from "../../api";
import barberKeys from "./barberKeys";

const queryFn = async ({
	queryKey: [{ page, perPage, entity, scope, ...q }],
}) => {
	const data = await getBarbers({ page, perPage, ...q });
	return data;
};

const useBarbersQuery = ({ ...q } = {}) => {
	return useQuery({
		queryKey: barberKeys.list({ ...q }),
		queryFn,
	});
};

export default useBarbersQuery;
