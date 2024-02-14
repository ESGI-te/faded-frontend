import SettingsForm from '@components/SettingsForm';
import useProviderQuery from '@queries/provider/useProviderQuery.hook';
import useUpdateProviderImageMutation from '@queries/provider/useUpdateProviderImageMutation.hook';
import useUpdateProviderMutation from '@queries/provider/useUpdateProviderMutation.hook';
import useUserQuery from 'shared/src/queries/user/useUserQuery.hook';
import { toast } from 'react-toastify';
import { useIntl } from 'react-intl';

const Settings = () => {
    const user = useUserQuery();
    const provider = useProviderQuery(user.data?.provider?.id);
    const updateProvider = useUpdateProviderMutation();
    const updateProviderImage = useUpdateProviderImageMutation();
    const isLoading = user.isLoading || provider.isLoading;
    const intl = useIntl();

    const onSubmit = ({ image, ...data }) => {
        if (image === null && provider.data?.image !== null) {
            updateProviderImage.mutate(
                { providerId: provider.data?.id, image: { image: null } },
                {
                    onSuccess: () => {
                        // TODO: Add success toast
                    },
                },
            );
        }

        if (image.length > 0) {
            updateProviderImage.mutate(
                { providerId: provider.data?.id, image: { image: image[0] } },
                {
                    onSuccess: () => {
                        // TODO: Add success toast
                    },
                },
            );
        }

        updateProvider.mutate(
            { providerId: provider.data?.id, provider: data },
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

    if (isLoading) return <div>Loading...</div>; // TODO: Add loading state

    return (
        <SettingsForm
            provider={provider?.data}
            onSubmit={onSubmit}
            isLoading={updateProvider.isLoading || updateProviderImage.isLoading}
        />
    );
};

export default Settings;
