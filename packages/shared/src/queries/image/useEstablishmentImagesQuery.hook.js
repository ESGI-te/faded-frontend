import { useQuery } from '@tanstack/react-query';
import { getEstablishmentImages } from '@/api/api';
import imageKeys from '@/queries/image/imageKeys';

const queryFn = async ({ queryKey: [{ establishmentId, page, perPage }] }) => {
    const data = await getEstablishmentImages(establishmentId, { page, perPage });

    return data;
};

const useEstablishmentImagesQuery = (establishmentId, { page, perPage } = {}) => {
    return useQuery({
        queryKey: imageKeys.listByEstablishmentId({ establishmentId, page, perPage }),
        queryFn,
        enabled: !!establishmentId,
    });
};

export default useEstablishmentImagesQuery;
