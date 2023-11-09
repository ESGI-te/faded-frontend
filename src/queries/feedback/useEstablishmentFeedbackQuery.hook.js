import { useQuery } from '@tanstack/react-query';
import { getEstablishmentFeedback } from '@/api/api';
import feedbackKeys from '@/queries/feedback/feedbackKeys';

const queryFn = async ({ queryKey: [{ establishmentId, page, itemsPerPage }] }) => {
    const data = await getEstablishmentFeedback(establishmentId, { page, itemsPerPage });

    return data;
};

const useEstablishmentFeedbackQuery = (establishmentId, { page, itemsPerPage } = {}) => {
    return useQuery({
        queryKey: feedbackKeys.listByEstablishmentId({ establishmentId, page, itemsPerPage }),
        queryFn,
        enabled: !!establishmentId,
    });
};

export default useEstablishmentFeedbackQuery;
