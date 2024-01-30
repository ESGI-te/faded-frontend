import { useQuery } from "@tanstack/react-query";
import { getEstablishmentPlanning } from "@/api/api";
import planningKeys from "@/queries/planning/planningKeys";

const queryFn = async ({ queryKey: [{ establishmentId, page, perPage }] }) => {
	const data = await getEstablishmentPlanning(establishmentId, {
		page,
		perPage,
	});

	return data;
};

const useEstablishmentPlanningQuery = (
	establishmentId,
	{ page, perPage } = {}
) => {
	return useQuery({
		queryKey: planningKeys.listByEstablishmentId({
			establishmentId,
			page,
			perPage,
		}),
		queryFn,
		enabled: !!establishmentId,
	});
};

export default useEstablishmentPlanningQuery;
