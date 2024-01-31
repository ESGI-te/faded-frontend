import Button from 'shared/src/components/Button';
import { FormattedMessage, useIntl } from 'react-intl';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import getDraftEstablishmentSchema from '../schemas/draftEstablishmentSchema';
import { useEstablishmentBeingEdited } from '../EstablishmentFormProvider';
import { filterFalsyValues, getDirtyValues } from '@utils/helpers';
import useUpdateEstablishmentMutation from '../useUpdateEstablishmentMutation.hook';

const SaveDraftAndCloseButton = () => {
    const intl = useIntl();
    const {
        watch,
        reset,
        formState: { dirtyFields },
    } = useFormContext();
    const updateEstablishmentMutation = useUpdateEstablishmentMutation();
    const navigate = useNavigate();
    const establishmentBeingEdited = useEstablishmentBeingEdited();
    const schema = getDraftEstablishmentSchema(intl);
    const formData = watch();
    const isSchemaValid = schema.isValidSync(formData);

    const onPress = async () => {
        const { information, ...establishmentData } = dirtyFields;
        const establishment = {
            ...information,
            ...establishmentData,
        };
        const dirtyValues = getDirtyValues(filterFalsyValues(establishment) || {}, formData);
        console.log(isSchemaValid);
        console.log(dirtyValues);
        if (!dirtyValues || Object.keys(dirtyValues).length === 0) return;
        // try {
        //     await saveEpisodeFormMutation.mutateAsync(
        //         {
        //             establishmentId: establishmentBeingEdited.id,
        //             ...dirtyValues,
        //         },
        //         {
        //             onSuccess: () => {
        //                 reset();
        //                 navigate('menu.episodes');
        //             },
        //         },
        //     );
        // } catch (error) {
        //     // Error toast ?
        // }
    };

    // TODO: Add error tooltip
    return (
        <Button
            isDisabled={!isSchemaValid}
            isLoading={updateEstablishmentMutation.isLoading}
            onPress={onPress}
            variant="secondary"
        >
            <FormattedMessage defaultMessage="Enregistrer et fermer" />
        </Button>
    );
};

export default SaveDraftAndCloseButton;
