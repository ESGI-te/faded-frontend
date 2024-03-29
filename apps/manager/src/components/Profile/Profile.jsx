import ProfileForm from '@components/ProfileForm';
import useUpdateUserMutation from 'shared/src/queries/user/useUpdateUserMutation.hook';
import useUserQuery from 'shared/src/queries/user/useUserQuery.hook';
import ProfileSkeleton from './ProfileSkeleton';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';

const Profile = () => {
    const { data: user, isLoading } = useUserQuery();
    const updateUser = useUpdateUserMutation();
    const intl = useIntl();

    const onSubmit = (data) => {
        updateUser.mutate(
            { userId: user.id, user: data },
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

    if (isLoading) return <ProfileSkeleton />;

    return <ProfileForm user={user} onSubmit={onSubmit} isLoading={updateUser.isLoading} />;
};

export default Profile;
