import { USER_ROLES } from 'shared/src/utils/constants';
import useUserQuery from 'shared/src/queries/user/useUserQuery.hook';
import PropTypes from 'prop-types';
import useUpdateServiceCategoryMutation from '@queries/serviceCategory/useUpdateServiceCategoryMutation.hook';
import { useMemo } from 'react';
import ServiceCategoryForm from '@components/ServiceCategoryForm';

const EditServiceCategory = ({ onCloseModal, serviceCategory }) => {
    const { data: user } = useUserQuery();
    const updateServiceCategory = useUpdateServiceCategoryMutation();
    const isAdmin = user?.roles?.includes(USER_ROLES.ADMIN);
    const isLoading = useMemo(
        () => updateServiceCategory.isLoading,updateServiceCategory.isLoading,
    );
    const defaultValues = {
        name: serviceCategory.name,
    };

    const handleEditServiceCategory = async (data) => {
        if (!isAdmin) return;
        const serviceCategoryPromise = updateServiceCategory.mutateAsync({ serviceCategoryId: serviceCategory.id, serviceCategory: data });
        await Promise.all([serviceCategoryPromise]);
        onCloseModal();
    };

    return (
        <ServiceCategoryForm
            isEdit
            onSubmit={handleEditServiceCategory}
            isLoading={isLoading}
            defaultValues={defaultValues}
        />
    );
};

EditServiceCategory.propTypes = {
    onCloseModal: PropTypes.func.isRequired,
    serviceCategory: PropTypes.object.isRequired,
};

EditServiceCategory.defaultProps = {
    onCloseModal: () => {},
};

export default EditServiceCategory;
