import PropTypes from 'prop-types';
import Button from 'shared/src/components/Button';
import Stack from 'shared/src/components/Stack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import useUpdateEstablishmentMutation from '@queries/establishment/useUpdateEstablishmentMutation.hook';
import useEstablishmentQuery from 'shared/src/queries/establishment/useEstablishmentQuery.hook';
import { ESTABLISHMENT_STATUS } from 'shared/src/utils/constants';
import { useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const MoveToDraftEstablishment = ({ onClose }) => {
    const { establishmentId } = useParams();
    const { data: establishment } = useEstablishmentQuery(establishmentId);
    const updateEstablishment = useUpdateEstablishmentMutation();

    const handlePublish = () => {
        if (establishment?.status !== ESTABLISHMENT_STATUS.ACTIVE) return;

        updateEstablishment.mutate(
            {
                establishmentId,
                establishment: {
                    status: ESTABLISHMENT_STATUS.DRAFT,
                },
            },
            {
                onSuccess: () => {
                    onClose();
                },
            },
        );
    };

    return (
        <Stack gap="0.5rem">
            <Button
                startIcon={<FontAwesomeIcon icon={icon({ name: 'reply', style: 'solid' })} />}
                onPress={handlePublish}
                isLoading={updateEstablishment.isLoading}
            >
                <FormattedMessage defaultMessage="Déplacer vers brouillons" />
            </Button>
            <Button variant="ghost" color="--neutral500" onPress={onClose}>
                <FormattedMessage defaultMessage="Annuler" />
            </Button>
        </Stack>
    );
};

MoveToDraftEstablishment.propTypes = {
    onClose: PropTypes.func.isRequired,
};

MoveToDraftEstablishment.defaultProps = {
    onClose: () => {},
};

export default MoveToDraftEstablishment;
