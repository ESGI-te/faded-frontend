import { useQuery } from '@tanstack/react-query';
import { getAllFeedback } from '@/api/api';
import feedbackKeys from '@/queries/feedback/feedbackKeys';

const queryFn = async ({ queryKey: [{ establishmentId, page, perPage }] }) => {
    const data = await getAllFeedback(establishmentId, { page, perPage });

    return data;
};

const useEstablishmentFeedbackQuery = (establishmentId, { page = 1, perPage = 5 } = {}) => {
    return useQuery({
        queryKey: feedbackKeys.listByEstablishmentId(establishmentId, {
            page,
            perPage,
        }),
        queryFn,
        enabled: !!establishmentId,
    });
};

export default useEstablishmentFeedbackQuery;
