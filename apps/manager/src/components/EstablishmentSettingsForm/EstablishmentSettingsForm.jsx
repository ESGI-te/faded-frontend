import { InputTextController } from 'shared/src/components/InputText';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import InputSearchPlaces from 'shared/src/components/InputSearchPlaces';
import { yupResolver } from '@hookform/resolvers/yup';
import useEstablishmentSettingsFormSchema from './useEstablishmentSettingsFormSchema.hook';
import styled from 'styled-components';
import Button from 'shared/src/components/Button';
import { ImageUploaderController } from 'shared/src/components/ImageUploader';

const EstablishmentSettingsForm = ({ establishment, onSubmit, isLoading }) => {
    const intl = useIntl();
    const schema = useEstablishmentSettingsFormSchema();
    const { control, handleSubmit, formState } = useForm({
        mode: 'onBlur',
        values: {
            name: establishment?.name,
            address: establishment?.address,
            phone: establishment?.phone,
            email: establishment?.email,
            cover: establishment?.cover,
        },
        resolver: yupResolver(schema),
    });
    const { isDirty } = formState;

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <ImageUploaderController
                control={control}
                name="cover"
                label={<FormattedMessage defaultMessage="Image" />}
            />
            <ResponsiveStack>
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
                    defaultValue={establishment?.address}
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
            </ResponsiveStack>
        </Form>
    );
};

const Form = styled.form`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    width: 100%;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        flex-direction: row;
        column-gap: 2rem;

        & > :first-child {
            flex-grow: 0;
        }
    }
`;
const ResponsiveStack = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        column-gap: 2rem;
        flex-grow: 1;
    }
`;
const SubmitButton = styled(Button)`
    margin-top: 1rem;
    align-self: stretch;
    background-color: var(--black);

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        align-self: center;
    }
`;

export default EstablishmentSettingsForm;
