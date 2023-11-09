import { useQuery } from '@tanstack/react-query';
import { getEstablishmentImages } from '@/api/api';
import imageKeys from '@/queries/image/imageKeys';

const queryFn = async ({ queryKey: [{ establishmentId, page, itemsPerPage }] }) => {
    const data = await getEstablishmentImages(establishmentId, { page, itemsPerPage });

    return data;
};

const useEstablishmentImagesQuery = (establishmentId, { page, itemsPerPage } = {}) => {
    return useQuery({
        queryKey: imageKeys.listByEstablishmentId({ establishmentId, page, itemsPerPage }),
        queryFn,
        enabled: !!establishmentId,
    });
};

export default useEstablishmentImagesQuery;
