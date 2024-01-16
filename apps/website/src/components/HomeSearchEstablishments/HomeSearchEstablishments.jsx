import HomeSearchEstablishmentsForm from '@components/HomeSearchEstablishmentsForm';
import { createSearchParams, useNavigate } from 'react-router-dom';

const HomeSearchEstablishments = () => {
    const navigate = useNavigate();

    const handleSearchService = (data) => {
        const searchData = { ...data, page: 1, perPage: 20 };

        navigate({
            pathname: '/establishments/',
            search: createSearchParams(searchData).toString(),
        });
    };

    return <HomeSearchEstablishmentsForm onSubmit={handleSearchService} />;
};

export default HomeSearchEstablishments;
