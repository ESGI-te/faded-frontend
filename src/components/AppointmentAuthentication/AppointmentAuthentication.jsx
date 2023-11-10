import Button from '@components/Button';
import useLoginMutation from '@components/Login/useLoginMutation.hook';
import LoginForm from '@components/LoginForm';
import RegisterForm from '@components/RegisterForm';
import Text from '@components/Text';
import { useAuth } from '@contexts/AuthProvider';
import useCreateUserMutation from '@queries/user/useCreateUserMutation.hook';
import { useState } from 'react';
import { Separator } from 'react-aria-components';
import styled from 'styled-components';

const AppointmentAuthentication = () => {
    const [form, setForm] = useState();
    const register = useCreateUserMutation();
    const login = useLoginMutation();
    const { onAuthenticate } = useAuth();

    const handleLogin = (data) => {
        login.mutate(data, {
            onSuccess: ({ token }) => {
                onAuthenticate(token);
            },
        });
    };

    const handleRegister = (formData) => {
        const { password_confirmation, ...data } = formData;
        register.mutate(data, {
            onSuccess: () => {
                handleLogin({ email: data.email, password: data.password });
            },
        });
    };

    return (
        <AppointmentAuthenticationWrapper>
            {form === 'register' ? (
                <RegisterForm onSubmit={handleRegister} />
            ) : (
                <CallToActionWrapper>
                    <Text variant="headingS" fontWeight="--fw-semibold">
                        Nouveau sur Barbers ?
                    </Text>
                    <AuthenticationButton onPress={() => setForm('register')} variant="secondary">
                        Créer mon compte
                    </AuthenticationButton>
                </CallToActionWrapper>
            )}
            <DividerWrapper>
                <DividerLine />
                <Text>OU</Text>
                <DividerLine />
            </DividerWrapper>
            {form === 'login' ? (
                <LoginForm onSubmit={handleLogin} />
            ) : (
                <CallToActionWrapper>
                    <Text variant="headingS" fontWeight="--fw-semibold">
                        Vous avez déjà utilisé Barbers ?
                    </Text>
                    <AuthenticationButton
                        variant={form === 'register' ? 'secondary' : 'primary'}
                        onPress={() => setForm('login')}
                    >
                        Se connecter
                    </AuthenticationButton>
                </CallToActionWrapper>
            )}
        </AppointmentAuthenticationWrapper>
    );
};

const DividerWrapper = styled.div`
    display: flex;
    align-items: center;
    column-gap: 1rem;
`;
const DividerLine = styled(Separator)`
    flex: 1;
    border: solid 1px var(--neutral100);
`;
const CallToActionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 1rem;
`;
const AppointmentAuthenticationWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    padding: 1rem;
    border-radius: var(--r-s);
    background-color: var(--white);
    width: 100%;
`;
const AuthenticationButton = styled(Button)`
    align-self: stretch;
`;

export default AppointmentAuthentication;
