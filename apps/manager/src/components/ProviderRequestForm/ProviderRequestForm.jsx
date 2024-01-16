import { providerRequestFormSchema } from './ProviderRequestForm.schema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { InputTextController } from 'shared/src/components/InputText';
import Button from 'shared/src/components/Button';
import { FormattedMessage, useIntl } from 'react-intl';

const ProviderRequestForm = ({ onSubmit, isLoading }) => {
    const intl = useIntl();
    const { control, handleSubmit, formState } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(providerRequestFormSchema),
        defaultValues: {
            personalEmail: '',
            professionalEmail: '',
            firstName: '',
            lastName: '',
            phone: '',
            kbis: '',
        },
    });
    const { isDirty } = formState;
    console.log(formState.errors);
    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <ResponsiveWrapper>
                <InputTextController
                    control={control}
                    name="firstName"
                    placeholder={intl.formatMessage({ defaultMessage: 'Prénom' })}
                    label={<FormattedMessage defaultMessage="Prénom" />}
                />
                <InputTextController
                    control={control}
                    name="lastName"
                    placeholder={intl.formatMessage({ defaultMessage: 'Nom' })}
                    label={<FormattedMessage defaultMessage="Nom" />}
                />
            </ResponsiveWrapper>
            <InputTextController
                control={control}
                name="personalEmail"
                placeholder={intl.formatMessage({ defaultMessage: 'Email personel' })}
                label={<FormattedMessage defaultMessage="Email personel" />}
                type="email"
            />
            <ResponsiveWrapper>
                <InputTextController
                    control={control}
                    name="kbis"
                    placeholder="Kbis"
                    label="Kbis"
                />
                <InputTextController
                    control={control}
                    name="phone"
                    placeholder={intl.formatMessage({ defaultMessage: 'Téléphone' })}
                    label={<FormattedMessage defaultMessage="Téléphone" />}
                />
            </ResponsiveWrapper>
            <InputTextController
                control={control}
                name="professionalEmail"
                placeholder={intl.formatMessage({ defaultMessage: 'Email professionnel' })}
                label={<FormattedMessage defaultMessage="Email professionnel" />}
                type="email"
            />
            <InputTextController
                control={control}
                name="companyName"
                placeholder={intl.formatMessage({ defaultMessage: "Nom de l'entreprise" })}
                label={<FormattedMessage defaultMessage="Nom de l'entreprise" />}
            />
            <InputTextController
                control={control}
                name="companyAddress"
                placeholder={intl.formatMessage({ defaultMessage: "Adresse de l'entreprise" })}
                label={<FormattedMessage defaultMessage="Adresse de l'entreprise" />}
            />
            <SubmitButton isDisabled={!isDirty} isLoading={isLoading} type="submit">
                <FormattedMessage defaultMessage="Faire ma demande" />
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

ProviderRequestForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
};

ProviderRequestForm.defaultProps = {
    onSubmit: () => {},
    isLoading: false,
};

export default ProviderRequestForm;
