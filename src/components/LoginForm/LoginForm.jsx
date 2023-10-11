import { Controller, useForm } from 'react-hook-form';
import { loginFormSchema } from './LoginForm.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import useLoginMutation from './useLoginMutation.hook';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();
    const { control, handleSubmit, formState } = useForm({
        mode: 'onChange',
        resolver: yupResolver(loginFormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const { isDirty, isValid } = formState;
    const login = useLoginMutation();

    const onSubmit = (data) => {
        login.mutate(data, {
            onSuccess: ({ accessToken }) => {
                localStorage.setItem('accessToken', accessToken);
                navigate('/', { replace: true });
            },
        });
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                control={control}
                name="email"
                render={({ field, fieldState: { error } }) => (
                    <Label>
                        Email
                        <input {...field} type="text" />
                    </Label>
                )}
            />
            <Controller
                control={control}
                name="password"
                render={({ field, fieldState: { error } }) => (
                    <Label>
                        Mot de passe
                        <input {...field} type="password" />
                    </Label>
                )}
            />
            <button disabled={!isDirty || !isValid} type="submit">
                Se connecter
            </button>
        </Form>
    );
};

const Form = styled.form`
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
`;
const Label = styled.label`
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
    align-items: flex-start;
`;

export default LoginForm;
