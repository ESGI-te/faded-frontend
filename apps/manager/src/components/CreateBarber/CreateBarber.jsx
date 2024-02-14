import BarberForm from '@components/BarberForm';
import useCreateBarberMutation from '@queries/barber/useCreateBarberMutation.hook';
import { USER_ROLES } from 'shared/src/utils/constants';
import useUserQuery from 'shared/src/queries/user/useUserQuery.hook';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';

const CreateBarber = ({ onCloseModal }) => {
    const { data: user } = useUserQuery();
    const createBarber = useCreateBarberMutation();
    const isProvider = user?.roles?.includes(USER_ROLES.PROVIDER);
    const providerId = isProvider && user.provider.id;
    const intl = useIntl();

    const handleCreateBarber = (barber) => {
        if (!isProvider || !providerId) return;

        createBarber.mutate(barber, {
            onSuccess: () => {
                toast.success(
                    intl.formatMessage({
                        defaultMessage: 'Votre coiffeur a été créé avec succès',
                    }),
                );
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
