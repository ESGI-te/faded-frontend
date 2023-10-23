import { useParams } from 'react-router-dom';

const EstablishmentPage = () => {
    const { establishmentId } = useParams();
    return <div>{establishmentId}</div>;
};

export default EstablishmentPage;
