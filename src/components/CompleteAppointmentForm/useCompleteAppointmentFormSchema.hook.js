import * as yup from 'yup';

const useCompleteAppointmentFormSchema = () => {
    return yup.object({
        code: yup.string().min(6).max(6).required(),
    });
};

export default useCompleteAppointmentFormSchema;
