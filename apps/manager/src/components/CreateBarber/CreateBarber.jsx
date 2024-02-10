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

    const handleCreateBarber = (barber) => {
        if (!isProvider || !providerId) return;

        createBarber.mutate(barber, {
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
