import * as yup from 'yup';

const useEditServiceCategoryFormSchema = () => {
    return yup.object({
        name: yup.string().notRequired(),
    });
};

export default useEditServiceCategoryFormSchema;
