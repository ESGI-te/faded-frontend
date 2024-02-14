import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import Button from 'shared/src/components/Button';
import PropTypes from 'prop-types';
import { InputTextController } from 'shared/src/components/InputText';
import { FormattedMessage, useIntl } from 'react-intl';
import usePasswordFormSchema from './usePasswordFormSchema.hook';
import useUpdateUserMutation from 'shared/src/queries/user/useUpdateUserMutation.hook';

const PasswordForm = ({ userId, onCloseModal }) => {
    const schema = usePasswordFormSchema();
    const { control, handleSubmit, formState } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });
    const { isDirty } = formState;
    const intl = useIntl();
    const updateUser = useUpdateUserMutation();

    const onSubmit = (data) => {
        updateUser.mutate(
            { userId, user: data },
            {
                onSuccess: () => {
                    // TODO: Add success toast
                    onCloseModal();
                },
            },
        );
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <InputTextController
                control={control}
                name="currentPassword"
                type="password"
                label={<FormattedMessage defaultMessage="Mot de passe actuel" />}
                placeholder={intl.formatMessage({ defaultMessage: '6 caractères minimum' })}
                isRequired
            />
            <InputTextController
                control={control}
                name="plainPassword"
                type="password"
                label={<FormattedMessage defaultMessage="Nouveau mot de passe" />}
                placeholder={intl.formatMessage({ defaultMessage: '6 caractères minimum' })}
                isRequired
            />
            <InputTextController
                control={control}
                name="passwordConfirmation"
                type="password"
                label={<FormattedMessage defaultMessage="Confirmation du nouveau mot de passe" />}
                placeholder={intl.formatMessage({ defaultMessage: '6 caractères minimum' })}
                isRequired
            />
            <ActionsWrapper>
                <SubmitButton isDisabled={!isDirty} isLoading={updateUser.isLoading} type="submit">
                    <FormattedMessage defaultMessage="Enregistrer" />
                </SubmitButton>
                <CancelButton variant="ghost" onPress={onCloseModal}>
                    <FormattedMessage defaultMessage="Annuler" />
                </CancelButton>
            </ActionsWrapper>
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
    background-color: var(--black);
`;
const ActionsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    align-items: stretch;
    margin-top: 1rem;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        flex-direction: row;
        align-items: center;
        column-gap: 1rem;
        justify-content: end;
        margin-top: 2rem;

        & > :first-child {
            order: 1;
        }
    }
`;
const CancelButton = styled(Button)`
    color: var(--neutral500);
`;

PasswordForm.propTypes = {
    userId: PropTypes.string.isRequired,
    onCloseModal: PropTypes.func.isRequired,
};

PasswordForm.defaultProps = {
    onCloseModal: () => {},
};

export default PasswordForm;
