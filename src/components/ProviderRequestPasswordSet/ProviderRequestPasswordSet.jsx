import PasswordSetForm from "@components/PasswordSetForm";
import useCreateProviderMutation from "@queries/provider/useCreateProviderMutation.hook";
import useProviderRequestsQuery from "@queries/providerRequest/useProviderRequestsQuery.hook";
import { useNavigate } from "react-router-dom";
import { USER_ROLES } from "@utils/constants";

const ProviderRequestPasswordSet = ({ token }) => {

    const navigate = useNavigate();

    const { data: providerRequest } = useProviderRequestsQuery({token});

    const createProvider = useCreateProviderMutation();

    const handleCreateProvider = ({ plainPassword }) => {
        if (!token) return;
        // Create new user with associated provider
        const user = {
            firstName: providerRequest[0].firstName,
            lastName: providerRequest[0].lastName,
            email: providerRequest[0].personalEmail,
            plainPassword,
            roles: [USER_ROLES.USER, USER_ROLES.PROVIDER],
        }
        const provider = {
            email: providerRequest[0].professionalEmail,
            phone: providerRequest[0].phone,
            kbis: providerRequest[0].kbis,
            address: providerRequest[0].companyAddress,
            name: providerRequest[0].companyName,
        }

        const data = {
            ...user,
            provider,
        };

        createProvider.mutate(data, {
            onSuccess: () => {
                navigate('/login');
            },
        });
    };

    return <PasswordSetForm onSubmit={handleCreateProvider} isLoading={useCreateProviderMutation.isLoading} />;

}

export default ProviderRequestPasswordSet;