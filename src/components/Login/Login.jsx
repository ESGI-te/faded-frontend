import LoginForm from '@components/LoginForm';
import useLoginMutation from './useLoginMutation.hook';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@contexts/AuthProvider';

const Login = () => {
    const navigate = useNavigate();
    const login = useLoginMutation();
    const { onAuthenticate } = useAuth();

    const onSubmit = (data) => {
        login.mutate(data, {
            onSuccess: ({ token }) => {
                onAuthenticate(token);
                navigate('/', { replace: true });
            },
        });
    };
    return <LoginForm onSubmit={onSubmit} IsLoading={login.isLoading} />;
};

export default Login;
