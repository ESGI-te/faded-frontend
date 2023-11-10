import { useForm } from 'react-hook-form';
import { loginFormSchema } from './LoginForm.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import Button from '@components/Button';
import PropTypes from 'prop-types';
import { InputTextController } from '@components/InputText';
import { FormattedMessage } from 'react-intl';

const LoginForm = ({ onSubmit, isLoading }) => {
    const { control, handleSubmit, formState } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(loginFormSchema),
    });
    const { isDirty } = formState;

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <InputTextController
                control={control}
                name="email"
                placeholder="Email"
                label="Email"
                type="email"
            />
            <InputTextController
                control={control}
                name="password"
                type="password"
                label={<FormattedMessage defaultMessage="Mot de passe" />}
                placeholder="******"
            />
            <SubmitButton isDisabled={!isDirty} isLoading={isLoading} type="submit">
                <FormattedMessage defaultMessage="Se connecter" />
            </SubmitButton>
        </Form>
    );
};

const Form = styled.form`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    width: 100%;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        row-gap: 2rem;
    }
`;
const SubmitButton = styled(Button)`
    margin-top: 1rem;
    align-self: stretch;
    background-color: var(--black);
`;

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
};

LoginForm.defaultProps = {
    onSubmit: () => {},
    isLoading: false,
};

export default LoginForm;
