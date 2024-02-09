import { useQuery } from '@tanstack/react-query';
import { getUsersTraffic } from '@api/api';

const queryFn = async ({ queryKey: [{ start, end }] }) => {
    const data = await getUsersTraffic({ start, end });

    return data;
};

const useUsersTrafficQuery = ({ start, end }) => {
    return useQuery({
        queryKey: [
            { entity: 'statistics', scope: 'usersTraffic', start, end },
        ],
        queryFn,
        enabled: !!start && !!end,
    });
};

export default useUsersTrafficQuery;
