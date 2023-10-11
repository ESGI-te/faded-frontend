import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/api/api';
import userKeys from './userKeys';

const queryFn = async () => {
    const { data } = await getUser();

    return data;
};

const useUserQuery = () => {
    return useQuery({
        queryKey: userKeys.detail(),
        queryFn,
    });
};

export default useUserQuery;
