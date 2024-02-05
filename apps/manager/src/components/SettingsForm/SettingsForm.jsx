import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import Button from 'shared/src/components/Button';
import PropTypes from 'prop-types';
import { InputTextController } from 'shared/src/components/InputText';
import { FormattedMessage, useIntl } from 'react-intl';
import useSettingsFormSchema from './useSettingsFormSchema.hook';
import InputSearchPlaces from 'shared/src/components/InputSearchPlaces';
import { ImageUploaderController } from 'shared/src/components/ImageUploader';

const SettingsForm = ({ provider, onSubmit, isLoading }) => {
    const schema = useSettingsFormSchema();
    const { control, handleSubmit, formState } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema),
        defaultValues: {
            name: provider?.name,
            address: provider?.address,
            phone: provider?.phone,
            email: provider?.email,
            image: provider?.image,
        },
    });
    const { isDirty } = formState;
    const intl = useIntl();

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <ImageUploaderController
                control={control}
                name="image"
                label={<FormattedMessage defaultMessage="Image" />}
            />
            <ResponsiveStack>
                <InputTextController
                    control={control}
                    name="name"
                    placeholder={intl.formatMessage({ defaultMessage: 'Nom' })}
                    label={<FormattedMessage defaultMessage="Nom" />}
                    isRequired
                />
                <InputSearchPlaces
                    label={<FormattedMessage defaultMessage="Adresse" />}
                    control={control}
                    name="address"
                    defaultValue={provider?.address}
                    isRequired
                />
                <InputTextController
                    name="phone"
                    control={control}
                    label={<FormattedMessage defaultMessage="Téléphone" />}
                    placeholder={intl.formatMessage({
                        defaultMessage: 'Le numéro de téléphone de votre établissement',
                    })}
                    type="phone"
                    isRequired
                />
                <InputTextController
                    name="email"
                    control={control}
                    label={<FormattedMessage defaultMessage="Email" />}
                    placeholder={intl.formatMessage({
                        defaultMessage: "L'email de votre établissement",
                    })}
                    type="email"
                    isRequired
                />
                <SubmitButton isDisabled={!isDirty} isLoading={isLoading} type="submit">
                    <FormattedMessage defaultMessage="Enregistrer" />
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

SettingsForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    provider: PropTypes.object.isRequired,
};

SettingsForm.defaultProps = {
    onSubmit: () => {},
    isLoading: false,
};

export default SettingsForm;
