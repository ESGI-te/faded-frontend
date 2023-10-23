import SearchEstablishmentsForm from '@components/SearchEstablishmentsForm';
import useEstablishmentsQuery from '@queries/establishment/useEstablishmentsQuery.hook';
import { useState } from 'react';

const SearchEstablishments = () => {
    const [queryParameters, setQueryParameters] = useState({});
    const establishments = useEstablishmentsQuery(queryParameters, {
        enabled: Object.keys(queryParameters).length > 0,
    });

    const handleSearchService = async (data) => {
        setQueryParameters(data);
    };

    return (
        <SearchEstablishmentsForm
            onSubmit={handleSearchService}
            isLoading={establishments.isLoading}
        />
    );
};

export default SearchEstablishments;
