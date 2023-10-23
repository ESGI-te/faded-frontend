import { useQuery } from '@tanstack/react-query';
import { getEstablishments } from '@/api/api';
import establishmentKeys from '@/queries/establishment/establishmentKeys';

const queryFn = async ({ queryKey: [{ page, itemsPerPage, entity, scope, ...q }] }) => {
    const data = await getEstablishments({ ...q, page, itemsPerPage });

    return data;
};

const useEstablishmentsQuery = ({ page = 1, itemsPerPage = 20, ...q } = {}, config) => {
    return useQuery({
        queryKey: establishmentKeys.list({ ...q, page, itemsPerPage }),
        queryFn,
        ...config,
    });
};

export default useEstablishmentsQuery;
