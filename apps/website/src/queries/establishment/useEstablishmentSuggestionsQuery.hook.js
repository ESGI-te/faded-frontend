import { useQuery } from '@tanstack/react-query';
import { getEstablishmentSuggestions } from '@/api/api';
import establishmentKeys from 'shared/src/queries/establishment/establishmentKeys';

const queryFn = async ({ queryKey: [{ page, perPage, name }] }) => {
    const data = await getEstablishmentSuggestions({ name, page, perPage });

    return data;
};

const useEstablishmentSuggestionsQuery = ({ name, page = 1, perPage = 20 } = {}) => {
    return useQuery({
        queryKey: establishmentKeys.suggestionList({ name, page, perPage }),
        queryFn,
        enabled: !!name,
    });
};

export default useEstablishmentSuggestionsQuery;
