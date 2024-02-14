import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import Button from 'shared/src/components/Button';
import PropTypes from 'prop-types';
import { InputTextController } from 'shared/src/components/InputText';
import { FormattedMessage, useIntl } from 'react-intl';
import useCreateEstablishmentFormSchema from './useCreateEstablishmentFormSchema.hook';
import useUserQuery from 'shared/src/queries/user/useUserQuery.hook';
import { USER_ROLES } from 'shared/src/utils/constants';
import { useNavigate } from 'react-router-dom';
import useCreateEstablishmentMutation from '@queries/establishment/useCreateEstablishmentMutation.hook';
import { toast } from 'react-toastify';

const CreateEstablishmentForm = ({ onCloseModal }) => {
    const schema = useCreateEstablishmentFormSchema();
    const {
        control,
        handleSubmit,
        formState: { isDirty },
    } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });
    const intl = useIntl();
    const { data: user } = useUserQuery();
    const isProvider = user?.roles?.includes(USER_ROLES.PROVIDER);
    const navigate = useNavigate();
    const createEstablishment = useCreateEstablishmentMutation();

    const onSubmit = (establishment) => {
        if (!isProvider) return;
        createEstablishment.mutate(establishment, {
            onSuccess: (establishment) => {
                toast.success(
                    intl.formatMessage({
                        defaultMessage: 'Votre établissement été créé avec succès',
                    }),
                );
                navigate(`/${establishment.id}`);
            },
        });
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <InputTextController
                control={control}
                name="name"
                label={<FormattedMessage defaultMessage="Nom de l'établissement" />}
                placeholder={intl.formatMessage({ defaultMessage: 'Ryan Hair Paris' })}
            />
            <ActionsWrapper>
                <SubmitButton
                    isDisabled={!isDirty}
                    isLoading={createEstablishment.isLoading}
                    type="submit"
                >
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

CreateEstablishmentForm.propTypes = {
    user: PropTypes.object.isRequired,
    onCloseModal: PropTypes.func.isRequired,
};

CreateEstablishmentForm.defaultProps = {
    onCloseModal: () => {},
    onSubmit: () => {},
    isLoading: false,
};

export default CreateEstablishmentForm;
