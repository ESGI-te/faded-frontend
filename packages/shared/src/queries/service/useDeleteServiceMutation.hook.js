import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteService } from "../../api";
import serviceKeys from "./serviceKeys";

const mutationFn = async (serviceId) => {
	const data = await deleteService(serviceId);
	return data;
};

const useDeleteServiceMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn,
		onSuccess: (data) =>
			queryClient.invalidateQueries({
				queryKey: serviceKeys.list(),
			}),
	});
};

export default useDeleteServiceMutation;
