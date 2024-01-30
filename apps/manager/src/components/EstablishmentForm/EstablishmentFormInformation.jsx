import Stack from 'shared/src/components/Stack';
import { InputTextController } from 'shared/src/components/InputText';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import InputSearchPlaces from 'shared/src/components/InputSearchPlaces';
import EstablishmentFormAccordionNextStepButton from './EstablishmentFormAccordion/EstablishmentFormAccordionNextStepButton';

const EstablishmentFormInformation = () => {
    const intl = useIntl();
    const { control, getValues } = useFormContext();

    return (
        <Stack gap="2rem">
            <InputTextController
                name="information.name"
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
                name="information.address"
                defaultValue={getValues('information.address')}
            />
            <InputTextController
                name="information.email"
                control={control}
                label={<FormattedMessage defaultMessage="Email" />}
                placeholder={intl.formatMessage({
                    defaultMessage: "L'email de votre établissement",
                })}
                type="email"
            />
            <InputTextController
                name="information.phone"
                control={control}
                label={<FormattedMessage defaultMessage="Téléphone" />}
                placeholder={intl.formatMessage({
                    defaultMessage: 'Le numéro de téléphone de votre établissement',
                })}
                type="phone"
            />
            <EstablishmentFormAccordionNextStepButton />
        </Stack>
    );
};

export default EstablishmentFormInformation;
