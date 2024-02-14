import * as yup from 'yup';

const useServiceCategoryFormSchema = () => {
    return yup.object({
        name: yup.string().required(),
    });
};

export default useServiceCategoryFormSchema;
