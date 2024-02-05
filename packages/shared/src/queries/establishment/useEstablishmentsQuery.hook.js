import { useQuery } from "@tanstack/react-query";
import { getEstablishments } from "../../api";
import establishmentKeys from "./establishmentKeys";

const queryFn = async ({
	queryKey: [{ page, perPage, entity, scope, ...q }],
}) => {
	const data = await getEstablishments({ ...q, page, perPage });

	return data;
};

const useEstablishmentsQuery = ({ ...q } = {}, config) => {
	return useQuery({
		queryKey: establishmentKeys.list({ ...q }),
		queryFn,
		...config,
	});
};

export default useEstablishmentsQuery;
