import SearchEstablishmentsForm from '@components/SearchEstablishmentsForm';
import { useMemo } from 'react';
import { createSearchParams, useSearchParams } from 'react-router-dom';

const SearchEstablishments = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const params = useMemo(() => Object.fromEntries([...searchParams]), [searchParams]);

    const handleSearchService = (data) => {
        setSearchParams(createSearchParams(data));
    };

    return <SearchEstablishmentsForm onSubmit={handleSearchService} defaultValues={params} />;
};

export default SearchEstablishments;
