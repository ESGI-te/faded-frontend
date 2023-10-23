import { useQuery } from '@tanstack/react-query';
import { getEstablishmentSuggestions } from '@/api/api';
import establishmentKeys from '@/queries/establishment/establishmentKeys';

const queryFn = async ({ queryKey: [{ page, itemsPerPage, name }] }) => {
    const data = await getEstablishmentSuggestions({ name, page, itemsPerPage });

    return data;
};

const useEstablishmentSuggestionsQuery = ({ name, page = 1, itemsPerPage = 20 } = {}) => {
    return useQuery({
        queryKey: establishmentKeys.suggestionList({ name, page, itemsPerPage }),
        queryFn,
        enabled: !!name,
    });
};

export default useEstablishmentSuggestionsQuery;
