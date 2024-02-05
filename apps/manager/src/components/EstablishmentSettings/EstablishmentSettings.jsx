import EstablishmentSettingsForm from '@components/EstablishmentSettingsForm';
import useEstablishmentQuery from 'shared/src/queries/establishment/useEstablishmentQuery.hook';
import { useParams } from 'react-router-dom';
import useUpdateEstablishmentMutation from '@queries/establishment/useUpdateEstablishmentMutation.hook';
import useUpdateEstablishmentImageMutation from '@queries/establishment/useUpdateEstablishmentImageMutation.hook';

const EstablishmentSettings = () => {
    const { establishmentId } = useParams();
    const establishment = useEstablishmentQuery(establishmentId);
    const updateEstablishment = useUpdateEstablishmentMutation();
    const updateEstablishmentImage = useUpdateEstablishmentImageMutation();

    const onSubmit = ({ image, ...data }) => {
        if (image === null && establishment.data?.image !== null) {
            updateEstablishmentImage.mutate(
                { establishmentId: establishment.data?.id, image: { image: null } },
                {
                    onSuccess: () => {
                        // TODO: Add success toast
                    },
                },
            );
        }

        if (image.length > 0) {
            updateEstablishmentImage.mutate(
                { establishmentId: establishment.data?.id, image: { image: image[0] } },
                {
                    onSuccess: () => {
                        // TODO: Add success toast
                    },
                },
            );
        }

        updateEstablishment.mutate(
            { establishmentId: establishment.data?.id, establishment: data },
            {
                onSuccess: () => {
                    // TODO: Add success toast
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
