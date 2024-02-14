import ServiceCategoryForm from '@components/ServiceCategoryForm';
import { USER_ROLES } from 'shared/src/utils/constants';
import useUserQuery from 'shared/src/queries/user/useUserQuery.hook';
import PropTypes from 'prop-types';
import useCreateServiceCategoryMutation from '@queries/serviceCategory/useCreateServiceCategoryMutation.hook';

const CreateServiceCategory = ({ onCloseModal }) => {
    const { data: user } = useUserQuery();
    const createServiceCategory = useCreateServiceCategoryMutation();
    const isAdmin = user?.roles?.includes(USER_ROLES.ADMIN);

    const handleCreateServiceCategory = (serviceCategory) => {
        if (!isAdmin) return;

        createServiceCategory.mutate(serviceCategory, {
            onSuccess: () => {
                onCloseModal();
            },
        });
    };
    return <ServiceCategoryForm onSubmit={handleCreateServiceCategory} isLoading={createServiceCategory.isLoading} />;
};

CreateServiceCategory.propTypes = {
    onCloseModal: PropTypes.func.isRequired,
};

CreateServiceCategory.defaultProps = {
    onCloseModal: () => { },
};

export default CreateServiceCategory;
