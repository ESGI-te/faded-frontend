import ProfileForm from '@components/ProfileForm';
import useUpdateUserMutation from 'shared/src/queries/user/useUpdateUserMutation.hook';
import useUserQuery from 'shared/src/queries/user/useUserQuery.hook';
import ProfileSkeleton from './ProfileSkeleton';

const Profile = () => {
    const { data: user, isLoading } = useUserQuery();
    const updateUser = useUpdateUserMutation();

    const onSubmit = (data) => {
        updateUser.mutate(
            { userId: user.id, user: data },
            {
                onSuccess: () => {
                    // TODO: Add success toast
                },
            },
        );
    };

    if (isLoading) return <ProfileSkeleton />;

    return <ProfileForm user={user} onSubmit={onSubmit} isLoading={updateUser.isLoading} />;
};

export default Profile;
