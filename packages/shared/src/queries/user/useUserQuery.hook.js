import { useQuery } from "@tanstack/react-query";
import userKeys from "./userKeys";
import { getUser } from "../../api";

const queryFn = async () => {
	const data = await getUser();

	return data;
};

const useUserQuery = () => {
	return useQuery({
		queryKey: userKeys.detail(),
		queryFn,
		enabled: !!localStorage.getItem("accessToken"),
	});
};

export default useUserQuery;
