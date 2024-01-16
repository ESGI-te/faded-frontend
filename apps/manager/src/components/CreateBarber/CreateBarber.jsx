import BarberForm from '@components/BarberForm';
import useCreateBarberMutation from '@queries/barber/useCreateBarberMutation.hook';
import { USER_ROLES } from 'shared/src/utils/constants';
import useUserQuery from 'shared/src/queries/user/useUserQuery.hook';
import PropTypes from 'prop-types';

const CreateBarber = ({ onCloseModal }) => {
    const { data: user } = useUserQuery();
    const createBarber = useCreateBarberMutation();
    const isProvider = user?.roles?.includes(USER_ROLES.PROVIDER);
    const providerId = isProvider && user.provider.id;

    const handleCreateBarber = (formData) => {
        if (!isProvider || !providerId) return;
        // Create new user with associated barber
        const data = {
            ...formData,
            plainPassword: crypto.randomUUID(), // tmp password
            barber: {
                firstName: formData.firstName,
                lastName: formData.lastName,
                provider: providerId,
            },
            roles: [USER_ROLES.USER, USER_ROLES.BARBER],
        };
        createBarber.mutate(data, {
            onSuccess: () => {
                onCloseModal();
            },
        });
    };

    return <BarberForm onSubmit={handleCreateBarber} isLoading={createBarber.isLoading} />;
};

CreateBarber.propTypes = {
    onCloseModal: PropTypes.func.isRequired,
};

CreateBarber.defaultProps = {
    onCloseModal: () => {},
};

export default CreateBarber;
