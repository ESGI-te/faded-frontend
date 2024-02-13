import ProviderRequestForm from '@components/ProviderRequestForm';
import useCreateProviderRequestMutation from '@queries/providerRequest/useProviderRequestMutation.hook';
import { useNavigate } from 'react-router-dom';

const ProviderRequest = () => {
    const navigate = useNavigate();

    const createProviderRequest = useCreateProviderRequestMutation();

    const handleCreateProviderRequest = (data) => {
        createProviderRequest.mutate(data, {
            onSuccess: () => {
                navigate('/login');
            },
        });
    };

    return (
        <ProviderRequestForm
            onSubmit={handleCreateProviderRequest}
            isLoading={createProviderRequest.isLoading}
        />
    );
};

export default ProviderRequest;
