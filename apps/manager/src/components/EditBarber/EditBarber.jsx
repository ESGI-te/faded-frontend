import BarberForm from '@components/BarberForm';
import { USER_ROLES } from 'shared/src/utils/constants';
import useUserQuery from 'shared/src/queries/user/useUserQuery.hook';
import PropTypes from 'prop-types';
import useUpdateBarberMutation from '@queries/barber/useUpdateBarberMutation.hook';
import useUpdateUserMutation from 'shared/src/queries/user/useUpdateUserMutation.hook';
import { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';

const EditBarber = ({ onCloseModal, barber }) => {
    const { data: user } = useUserQuery();
    const updateBarber = useUpdateBarberMutation();
    const updateUser = useUpdateUserMutation();
    const isProvider = user?.roles?.includes(USER_ROLES.PROVIDER);
    const isLoading = useMemo(
        () => updateBarber.isLoading || updateUser.isLoading,
        [updateBarber.isLoading, updateUser.isLoading],
    );
    const defaultValues = {
        firstName: barber.firstName,
        lastName: barber.lastName,
        email: barber.user.email,
        planning: barber.planning,
    };
    const intl = useIntl();

    const handleEditBarber = async (data) => {
        if (!isProvider) return;
        // Edit user with associated barber
        const userPromise = updateUser.mutateAsync({ userId: barber.user.id, user: data });
        const barberPromise = updateBarber.mutateAsync({ barberId: barber.id, barber: data });
        await Promise.all([userPromise, barberPromise]);
        toast.success(
            intl.formatMessage({ defaultMessage: 'Vos informations ont bien été mises à jour' }),
        );
        onCloseModal();
    };

    return (
        <BarberForm
            isEdit
            onSubmit={handleEditBarber}
            isLoading={isLoading}
            defaultValues={defaultValues}
        />
    );
};

EditBarber.propTypes = {
    onCloseModal: PropTypes.func.isRequired,
    barber: PropTypes.object.isRequired,
};

EditBarber.defaultProps = {
    onCloseModal: () => {},
};

export default EditBarber;
