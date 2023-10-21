import { useNavigate } from 'react-router-dom';
import useCreateUserMutation from '@queries/user/useCreateUserMutation.hook';
import RegisterForm from '@components/RegisterForm';

const Register = () => {
    const navigate = useNavigate();

    const register = useCreateUserMutation();

    const handleregister = (formData) => {
        const { password_confirmation, ...data } = formData;
        register.mutate(data, {
            onSuccess: () => {
                navigate('/login', { replace: true });
            },
        });
    };

    return <RegisterForm onSubmit={handleregister} isLoading={register.isLoading} />;
};

export default Register;
