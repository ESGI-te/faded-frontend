import { useQuery } from '@tanstack/react-query';
import { getEstablishments } from '@/api/api';
import establishmentKeys from '@/queries/establishment/establishmentKeys';

const queryFn = async ({ queryKey: [{ page, perPage, entity, scope, ...q }] }) => {
    const data = await getEstablishments({ ...q, page, perPage });

    return data;
};

const useEstablishmentsQuery = ({ page = 1, perPage = 20, ...q } = {}, config) => {
    return useQuery({
        queryKey: establishmentKeys.list({ ...q, page, perPage }),
        queryFn,
        ...config,
    });
};

export default useEstablishmentsQuery;
