import * as yup from 'yup';

const useEditBarberFormSchema = () => {
    return yup.object({
        firstName: yup.string().notRequired(),
        lastName: yup.string().notRequired(),
        email: yup.string().email().notRequired(),
    });
};

export default useEditBarberFormSchema;
