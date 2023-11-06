import HomeSearchEstablishmentsForm from '@components/HomeSearchEstablishmentsForm';
import { createSearchParams, useNavigate } from 'react-router-dom';

const HomeSearchEstablishments = () => {
    const navigate = useNavigate();

    const handleSearchService = (data) => {
        navigate({
            pathname: '/establishments/',
            search: createSearchParams(data).toString(),
        });
    };

    return <HomeSearchEstablishmentsForm onSubmit={handleSearchService} />;
};

export default HomeSearchEstablishments;
