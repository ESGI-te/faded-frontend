import { useForm } from 'react-hook-form';
import useResetPasswordFormSchema from './useResetPasswordFormSchema.hook';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { InputTextController } from 'shared/src/components/InputText';
import Button from 'shared/src/components/Button';
import { FormattedMessage } from 'react-intl';

const ResetPasswordForm = ({ onSubmit, isLoading }) => {
    const schema = useResetPasswordFormSchema();
    const { control, handleSubmit, formState } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema),
        defaultValues: {
            plainPassword: '',
            passwordConfirmation: '',
        },
    });
    const { isDirty } = formState;

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <InputTextController
                control={control}
                name="plainPassword"
                placeholder="******"
                label={<FormattedMessage defaultMessage="Mot de passe" />}
                type="password"
            />
            <InputTextController
                control={control}
                name="passwordConfirmation"
                placeholder="******"
                label={<FormattedMessage defaultMessage="Confirmation de mot de passe" />}
                type="password"
            />
            <SubmitButton isDisabled={!isDirty} isLoading={isLoading} type="submit">
                <FormattedMessage defaultMessage="Réinitialiser" />
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
const SubmitButton = styled(Button)`
    margin-top: 1rem;
    align-self: stretch;
    background-color: var(--black);
`;

ResetPasswordForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
};

ResetPasswordForm.defaultProps = {
    onSubmit: () => {},
    isLoading: false,
};

export default ResetPasswordForm;
