import { useQuery } from '@tanstack/react-query';
import { getEstablishment } from '@/api/api';
import establishmentKeys from '@/queries/establishment/establishmentKeys';

const queryFn = async ({ queryKey: [{ establishmentId }] }) => {
    const data = await getEstablishment(establishmentId);

    return data;
};

const useEstablishmentQuery = (establishmentId) => {
    return useQuery({
        queryKey: establishmentKeys.detailById(establishmentId),
        queryFn,
        enabled: !!establishmentId,
    });
};

export default useEstablishmentQuery;
