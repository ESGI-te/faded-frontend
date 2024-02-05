import { FORM_VALIDATION_MESSAGE } from 'shared/src/utils/validationMessages';
import * as yup from 'yup';
import { useIntl } from 'react-intl';

const useCreateEstablishmentFormSchema = () => {
    const intl = useIntl();

    return yup.object({
        name: yup
            .string()
            .min(2, intl.formatMessage(FORM_VALIDATION_MESSAGE.minLength, { min: 2 }))
            .required(intl.formatMessage(FORM_VALIDATION_MESSAGE.required)),
    });
};

export default useCreateEstablishmentFormSchema;
