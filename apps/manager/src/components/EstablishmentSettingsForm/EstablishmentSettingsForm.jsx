import { InputTextController } from 'shared/src/components/InputText';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import InputSearchPlaces from 'shared/src/components/InputSearchPlaces';
import { yupResolver } from '@hookform/resolvers/yup';
import useEstablishmentSettingsFormSchema from './useEstablishmentSettingsFormSchema.hook';
import styled from 'styled-components';
import Button from 'shared/src/components/Button';

const EstablishmentSettingsForm = ({ settings, onSubmit, isLoading }) => {
    const intl = useIntl();
    const schema = useEstablishmentSettingsFormSchema();
    const { control, handleSubmit, formState } = useForm({
        mode: 'onBlur',
        defaultValues: settings,
        resolver: yupResolver(schema),
    });
    const { isDirty } = formState;

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <InputTextController
                name="name"
                control={control}
                label={<FormattedMessage defaultMessage="Nom" />}
                placeholder={intl.formatMessage({
                    defaultMessage: 'Le nom de votre établissement',
                })}
                isRequired
            />
            <InputSearchPlaces
                label={<FormattedMessage defaultMessage="Adresse" />}
                control={control}
                name="address"
                defaultValue={settings?.address}
            />
            <InputTextController
                name="email"
                control={control}
                label={<FormattedMessage defaultMessage="Email" />}
                placeholder={intl.formatMessage({
                    defaultMessage: "L'email de votre établissement",
                })}
                type="email"
            />
            <InputTextController
                name="phone"
                control={control}
                label={<FormattedMessage defaultMessage="Téléphone" />}
                placeholder={intl.formatMessage({
                    defaultMessage: 'Le numéro de téléphone de votre établissement',
                })}
                type="phone"
            />
            <SubmitButton isDisabled={!isDirty} isLoading={isLoading} type="submit">
                <FormattedMessage defaultMessage="Modifier" />
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

export default EstablishmentSettingsForm;
