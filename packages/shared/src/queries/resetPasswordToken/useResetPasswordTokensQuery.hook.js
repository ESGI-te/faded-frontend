import { useQuery } from "@tanstack/react-query";
import { getResetPasswordTokens } from "../../api";

const queryFn = async ({ queryKey: [{ token }] }) => {
	const data = await getResetPasswordTokens(token);

	return data;
};

const useResetPasswordTokensQuery = (token) => {
	return useQuery({
		queryKey: [{ entity: "resetPasswordToken", token }],
		queryFn,
		enabled: false,
	});
};

export default useResetPasswordTokensQuery;
