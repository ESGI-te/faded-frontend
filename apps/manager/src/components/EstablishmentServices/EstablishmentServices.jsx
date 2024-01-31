import { useParams } from 'react-router-dom';
import useUserQuery from 'shared/src/queries/user/useUserQuery.hook';
import EstablishmentServicesForm from '@components/EstablishmentServicesForm';
import useServicesQuery from 'shared/src/queries/service/useServicesQuery.hook';

const EstablishmentServices = () => {
    const { establishmentId } = useParams();
    const { data: user } = useUserQuery();
    const { data: services, isLoading } = useServicesQuery({
        provider: user?.provider?.id || user?.barber?.provider?.id,
    });

    const handleEstablishmentServices = (data) => {};

    // TODO: Add loading skeleton
    if (isLoading) return <div>Loading...</div>;

    return (
        <EstablishmentServicesForm
            onSubmit={handleEstablishmentServices}
            isLoading={false}
            services={services}
        />
    );
};

export default EstablishmentServices;
