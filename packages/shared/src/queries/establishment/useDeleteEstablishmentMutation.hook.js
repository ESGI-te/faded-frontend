import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEstablishment } from "../../api";
import establishmentKeys from "./establishmentKeys";

const mutationFn = async (establishmentId) => {
	const data = await deleteEstablishment(establishmentId);
	return data;
};

const useDeleteEstablishmentMutation = (d) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn,
		onSuccess: (data, { establishmentId }) => {
			queryClient.invalidateQueries({
				queryKey: establishmentKeys.list(),
			});
			queryClient.invalidateQueries({
				queryKey: establishmentKeys.detailById(establishmentId),
			});
		},
	});
};

export default useDeleteEstablishmentMutation;
