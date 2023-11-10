import { useQuery } from '@tanstack/react-query';
import userKeys from './userKeys';
import { getUser } from '@api/api';
import { useAuth } from '@contexts/AuthProvider';

const queryFn = async () => {
    const data = await getUser();

    return data;
};

const useUserQuery = () => {
    const { isAuthenticated } = useAuth();
    return useQuery({
        queryKey: userKeys.detail(),
        queryFn,
        enabled: isAuthenticated,
    });
};

export default useUserQuery;
