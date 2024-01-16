import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../api";
import userKeys from "./userKeys";

const mutationFn = async ({ userId, user }) => {
	const data = await updateUser(userId, user);
	return data;
};

const useUpdateUserMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn,
		onSuccess: (data, { userId }) =>
			queryClient.invalidateQueries({
				queryKey: userKeys.detailById(userId),
			}),
	});
};

export default useUpdateUserMutation;
