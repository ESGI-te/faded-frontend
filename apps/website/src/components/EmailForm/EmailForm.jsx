import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import Button from 'shared/src/components/Button';
import PropTypes from 'prop-types';
import { InputTextController } from 'shared/src/components/InputText';
import { FormattedMessage } from 'react-intl';
import useEmailFormSchema from './useEmailFormSchema.hook';
import useUpdateUserMutation from 'shared/src/queries/user/useUpdateUserMutation.hook';

const EmailForm = ({ user, onCloseModal }) => {
    const schema = useEmailFormSchema();
    const { control, handleSubmit, formState } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema),
        defaultValues: {
            email: user?.email,
        },
    });
    const { isDirty } = formState;
    const updateUser = useUpdateUserMutation();

    const onSubmit = (data) => {
        updateUser.mutate(
            { userId: user.id, user: data },
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
                name="email"
                placeholder="Email"
                label="Email"
                type="email"
            />
            <InputTextController
                control={control}
                name="currentPassword"
                type="password"
                label={<FormattedMessage defaultMessage="Mot de passe" />}
                placeholder="******"
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

EmailForm.propTypes = {
    user: PropTypes.object.isRequired,
    onCloseModal: PropTypes.func.isRequired,
};

EmailForm.defaultProps = {
    onCloseModal: () => {},
    onSubmit: () => {},
    isLoading: false,
};

export default EmailForm;
