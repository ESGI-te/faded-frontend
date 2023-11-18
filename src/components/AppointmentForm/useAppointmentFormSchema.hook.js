import { useIntl } from 'react-intl';
import * as yup from 'yup';

export const useAppointmentFormSchema = () => {
    const intl = useIntl();

    return yup.object({
        service: yup.object().required(),
        barber: yup.string().notRequired(),
        dateTime: yup.string().required(),
    });
};
