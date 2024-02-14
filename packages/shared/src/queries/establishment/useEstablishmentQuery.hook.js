import { useQuery } from "@tanstack/react-query";
import { getEstablishment } from "../../api";
import establishmentKeys from "./establishmentKeys";

const queryFn = async ({ queryKey: [{ establishmentId }] }) => {
	const data = await getEstablishment(establishmentId);

	return data;
};

const useEstablishmentQuery = (establishmentId, config = {}) => {
	return useQuery({
		queryKey: establishmentKeys.detailById(establishmentId),
		queryFn,
		enabled: !!establishmentId,
		...config,
	});
};

export default useEstablishmentQuery;
