import { getUser } from '@api/api';
import LoginForm from '@components/LoginForm';
import useLoginMutation from './useLoginMutation.hook';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const login = useLoginMutation();

    const onSubmit = (data) => {
        login.mutate(data, {
            onSuccess: async ({ token }) => {
                localStorage.setItem('token', token);
                const user = await getUser();
                localStorage.setItem('user_roles', JSON.stringify(user.roles));
                navigate('/', { replace: true });
            },
        });
    };
    return <LoginForm onSubmit={onSubmit} IsLoading={login.isLoading} />;
};

export default Login;
