import { Controller, useForm } from 'react-hook-form';
import { registerFormSchema } from './RegisterForm.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import Cluster from '@components/layout/Cluster';
import useCreateUserMutation from '@queries/user/useCreateUserMutation.hook';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const navigate = useNavigate();
    const { control, handleSubmit, formState } = useForm({
        mode: 'onChange',
        resolver: yupResolver(registerFormSchema),
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            password_confirmation: '',
        },
    });
    const { isDirty, isValid } = formState;
    const register = useCreateUserMutation();

    const onSubmit = (formData) => {
        const { password_confirmation, ...data } = formData;
        register.mutate(data, {
            onSuccess: () => {
                navigate('/login', { replace: true });
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
            <Cluster gap="1rem" align="center">
                <Controller
                    control={control}
                    name="lastName"
                    render={({ field, fieldState: { error } }) => (
                        <Label>
                            Nom
                            <input {...field} type="text" />
                        </Label>
                    )}
                />
                <Controller
                    control={control}
                    name="firstName"
                    render={({ field, fieldState: { error } }) => (
                        <Label>
                            Prénom
                            <input {...field} type="text" />
                        </Label>
                    )}
                />
            </Cluster>
            <Controller
                control={control}
                name="username"
                render={({ field, fieldState: { error } }) => (
                    <Label>
                        Pseudo
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
            <Controller
                control={control}
                name="password_confirmation"
                render={({ field, fieldState: { error } }) => (
                    <Label>
                        Confirmer le mot de passe
                        <input {...field} type="password" />
                    </Label>
                )}
            />
            <button disabled={!isDirty || !isValid} type="submit">
                S'inscrire
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

export default RegisterForm;
