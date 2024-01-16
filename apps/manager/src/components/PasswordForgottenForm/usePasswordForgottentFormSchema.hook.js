import * as yup from 'yup';

const useForgottenPasswordFormSchema = () => {
    return yup.object({
        email: yup.string().email().required(),
    });
};

export default useForgottenPasswordFormSchema;
