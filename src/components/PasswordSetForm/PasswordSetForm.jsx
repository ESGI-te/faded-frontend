import { useForm } from 'react-hook-form';
import { passwordSetSchema } from './PasswordSetForm.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { InputTextController } from '@components/InputText';
import Button from '@components/Button';
import { FormattedMessage, useIntl } from 'react-intl';

const RegisterForm = ({ onSubmit, isLoading }) => {
    const intl = useIntl();
    const { control, handleSubmit, formState } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(passwordSetSchema),
        defaultValues: {
            password: '',
            password_confirmation: '',
        },
    });
    const { isDirty } = formState;

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <InputTextController
                control={control}
                name="password"
                placeholder="******"
                label={<FormattedMessage defaultMessage="Mot de passe" />}
                type="password"
            />
            <InputTextController
                control={control}
                name="password_confirmation"
                placeholder="******"
                label={<FormattedMessage defaultMessage="Confirmation de mot de passe" />}
                type="password"
            />
            <SubmitButton isDisabled={!isDirty} isLoading={isLoading} type="submit">
                <FormattedMessage defaultMessage="S'inscrire" />
            </SubmitButton>
        </Form>
    );
};

const Form = styled.form`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        row-gap: 2rem;
    }
`;
const ResponsiveWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        flex-direction: row;
        column-gap: 1rem;
    }
`;
const SubmitButton = styled(Button)`
    margin-top: 1rem;
    align-self: stretch;
    background-color: var(--black);
`;

RegisterForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
};

RegisterForm.defaultProps = {
    onSubmit: () => {},
    isLoading: false,
};

export default RegisterForm;
