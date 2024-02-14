import EstablishmentSettingsForm from '@components/EstablishmentSettingsForm';
import useEstablishmentQuery from 'shared/src/queries/establishment/useEstablishmentQuery.hook';
import { useParams } from 'react-router-dom';
import useUpdateEstablishmentMutation from '@queries/establishment/useUpdateEstablishmentMutation.hook';
import useUpdateEstablishmentImageMutation from '@queries/establishment/useUpdateEstablishmentImageMutation.hook';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';

const EstablishmentSettings = () => {
    const { establishmentId } = useParams();
    const establishment = useEstablishmentQuery(establishmentId);
    const updateEstablishment = useUpdateEstablishmentMutation();
    const updateEstablishmentImage = useUpdateEstablishmentImageMutation();
    const intl = useIntl();

    const onSubmit = ({ cover, ...data }) => {
        updateEstablishment.mutate(
            {
                establishmentId: establishment.data?.id,
                establishment: {
                    ...data,
                    cover: cover || null,
                },
            },
            {
                onSuccess: () => {
                    toast.success(
                        intl.formatMessage({
                            defaultMessage: 'Vos informations ont bien été mises à jour',
                        }),
                    );
                },
            },
        );
    };

    if (establishment.isLoading) return <div>Loading...</div>; // TODO: Add loading state

    return (
        <EstablishmentSettingsForm
            onSubmit={onSubmit}
            isLoading={updateEstablishment.isLoading || updateEstablishmentImage.isLoading}
            establishment={establishment?.data}
        />
    );
};

export default EstablishmentSettings;
