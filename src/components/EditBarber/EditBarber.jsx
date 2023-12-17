import BarberForm from '@components/BarberForm';
import { USER_ROLES } from '@utils/constants';
import useUserQuery from '@queries/user/useUserQuery.hook';
import PropTypes from 'prop-types';
import useUpdateBarberMutation from '@queries/barber/useUpdateBarberMutation.hook';
import useUpdateUserMutation from '@queries/user/useUpdateUserMutation.hook';
import { useMemo } from 'react';

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
    };

    const handleEditBarber = async (data) => {
        if (!isProvider) return;
        // Edit user with associated barber
        const { email, ...barberData } = data;
        const userPromise = updateUser.mutateAsync({ userId: barber.user.id, user: data });
        const barberPromise = updateBarber.mutateAsync({ barberId: barber.id, barber: barberData });
        await Promise.all([userPromise, barberPromise]);
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
