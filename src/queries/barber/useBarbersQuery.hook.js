import { useQuery } from '@tanstack/react-query';
import { getBarbers } from '@/api/api';
import barberKeys from '@/queries/barber/barberKeys';

const queryFn = async ({ queryKey: [{ page, perPage, ...q }] }) => {
    const data = await getBarbers({ page, perPage, ...q });
    return data;
};

const useBarbersQuery = ({ page = 1, perPage = 10, ...q } = {}) => {
    return useQuery({
        queryKey: barberKeys.list({ page, perPage, ...q }),
        queryFn,
    });
};

export default useBarbersQuery;
