import * as yup from 'yup';

const useBarberFormSchema = () => {
    return yup.object({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        email: yup.string().email().required(),
    });
};

export default useBarberFormSchema;
