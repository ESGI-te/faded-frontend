import * as yup from 'yup';
import { useIntl } from 'react-intl';
import { FORM_VALIDATION_MESSAGE } from 'shared/src/utils/validationMessages';

export const useHomeSearchEstablishmentsFormSchema = () => {
    const intl = useIntl();

    return yup.object({
        service: yup.string(),
        address: yup.string().required(intl.formatMessage(FORM_VALIDATION_MESSAGE.required)),
    });
};
