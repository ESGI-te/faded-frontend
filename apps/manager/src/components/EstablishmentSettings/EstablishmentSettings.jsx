import EstablishmentSettingsForm from '@components/EstablishmentSettingsForm';
import useEstablishmentQuery from 'shared/src/queries/establishment/useEstablishmentQuery.hook';
import { useParams } from 'react-router-dom';
import useUpdateEstablishmentMutation from '@queries/establishment/useUpdateEstablishmentMutation.hook';

const EstablishmentSettings = () => {
    const { establishmentId } = useParams();
    const { data: establishment, isLoading } = useEstablishmentQuery(establishmentId);
    const updateEstablishment = useUpdateEstablishmentMutation();
    const settings = {
        name: establishment?.name,
        address: establishment?.address,
        email: establishment?.email,
        phone: establishment?.phone,
    };

    const handleEstablishmentSettings = (data) => {
        updateEstablishment.mutate(
            {
                establishmentId,
                establishment: data,
            },
            {
                onSuccess: () => {
                    // TODO: show success toast
                },
            },
        );
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <EstablishmentSettingsForm
            onSubmit={handleEstablishmentSettings}
            isLoading={updateEstablishment.isLoading}
            settings={settings}
        />
    );
};

export default EstablishmentSettings;
