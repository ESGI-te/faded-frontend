import LoginForm from '@components/LoginForm';
import useLoginMutation from './useLoginMutation.hook';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@contexts/AuthProvider';
import { USER_ROLES } from 'shared/src/utils/constants';
import { useIntl } from 'react-intl';

const Login = () => {
    const navigate = useNavigate();
    const login = useLoginMutation();
    const { onAuthenticate } = useAuth();
    const [searchParams] = useSearchParams();
    const referrer = searchParams.get('referrer');
    const redirectionLink = referrer ?? '/';
    const intl = useIntl();

    const onSubmit = (data, setError) => {
        login.mutate(data, {
            onSuccess: async (data) => {
                console.log('in');
                const { token, refreshToken, roles } = data;
                if (roles.includes(USER_ROLES.PROVIDER) || roles.includes(USER_ROLES.BARBER)) {
                    setError('email', {
                        type: '400',
                        message: intl.formatMessage({
                            defaultMessage: "Nom d'utilisateur ou mot de passe incorrect.",
                        }),
                    });
                    return;
                }
                await onAuthenticate({ accessToken: token, refreshToken });
                navigate(redirectionLink, { replace: true });
            },
            onError: (error) => {
                setError('email', {
                    type: '401',
                    message: intl.formatMessage({
                        defaultMessage: "Nom d'utilisateur ou mot de passe incorrect",
                    }),
                });
            },
        });
    };

    return <LoginForm onSubmit={onSubmit} isLoading={login.isLoading} />;
};

export default Login;
