import ProviderRequestForm from '@components/ProviderRequestForm';
import useCreateProviderRequestMutation from '@queries/providerRequest/useProviderRequestMutation.hook';
import { useNavigate } from 'react-router-dom';

const ProviderRequest = () => {
    const navigate = useNavigate();

    const createProviderRequest = useCreateProviderRequestMutation();

    const handleCreateProviderRequest = (formData) => {
        const { data } = formData;
        createProviderRequest.mutate(data, {
            onSuccess: () => {
                navigate('/provider-request/success', { replace: true });
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
