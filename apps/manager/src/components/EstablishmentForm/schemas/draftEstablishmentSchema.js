import * as yup from 'yup';
import getEpisodeEstablishmentFormSchema from './establishmentSchema';

const getDraftEstablishmentSchema = (intl) => {
    const baseSchema = getEpisodeEstablishmentFormSchema(intl);

    return baseSchema.shape({
        information: yup.reach(baseSchema, 'information').shape({
            address: yup.reach(baseSchema, 'information.address').notRequired(),
            phone: yup.reach(baseSchema, 'information.phone').notRequired(),
            email: yup.reach(baseSchema, 'information.email').notRequired(),
        }),
        planning: yup.reach(baseSchema, 'planning').shape({
            monday: yup.reach(baseSchema, 'planning.monday').notRequired(),
            tuesday: yup.reach(baseSchema, 'planning.tuesday').notRequired(),
            wednesday: yup.reach(baseSchema, 'planning.wednesday').notRequired(),
            thursday: yup.reach(baseSchema, 'planning.thursday').notRequired(),
            friday: yup.reach(baseSchema, 'planning.friday').notRequired(),
            saturday: yup.reach(baseSchema, 'planning.saturday').notRequired(),
            sunday: yup.reach(baseSchema, 'planning.sunday').notRequired(),
        }),
        services: yup.reach(baseSchema, 'services').min(0),
        barbers: yup.reach(baseSchema, 'barbers').min(0),
    });
};

export default getDraftEstablishmentSchema;
