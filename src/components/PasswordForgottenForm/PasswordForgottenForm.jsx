import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import Button from '@components/Button';
import PropTypes from 'prop-types';
import { InputTextController } from '@components/InputText';
import { FormattedMessage } from 'react-intl';
import useForgottenPasswordFormSchema from './usePasswordForgottentFormSchema.hook';
import Text from '@components/Text';

const PasswordForgottenForm = ({ onSubmit, isLoading, isSuccess, isError }) => {
    const schema = useForgottenPasswordFormSchema();
    const { control, handleSubmit, formState, setError } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });
    const { isDirty } = formState;

    if (isError) {
        setError('email', {
            type: 'manual',
            message: "Cet email n'existe pas.",
        });
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <InputTextController
                control={control}
                name="email"
                placeholder="Email"
                label={<FormattedMessage defaultMessage="Email du compte" />}
                type="email"
            />
            {isSuccess && (
                <MessageWrapper>
                    <Text color="--success" fontWeight="--fw-semibold">
                        <FormattedMessage defaultMessage="Un email de réinitialisation vous a été envoyé." />
                    </Text>
                </MessageWrapper>
            )}
            {/* {isError && (
                <Text color="--error">
                    <FormattedMessage defaultMessage="Une erreur est survenue." />
                </Text>
            )} */}
            <SubmitButton isDisabled={!isDirty} isLoading={isLoading} type="submit">
                <FormattedMessage defaultMessage="Envoyer un lien de réinitialisation" />
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
const MessageWrapper = styled.div`
    padding: 1rem;
    border-radius: var(--r-s);
    background-color: var(--success50);
`;

PasswordForgottenForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    isSuccess: PropTypes.bool,
    isError: PropTypes.bool,
};

PasswordForgottenForm.defaultProps = {
    onSubmit: () => {},
    isLoading: false,
    isSuccess: false,
    isError: false,
};

export default PasswordForgottenForm;
