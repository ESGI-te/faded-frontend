import PropTypes from 'prop-types';
import { ESTABLISHMENT_STATUS, UI_VARIANTS } from 'shared/src/utils/constants';
import { defineMessages, FormattedMessage } from 'react-intl';
import Badge from 'shared/src/components/Badge';

const statusVariantLookup = {
    [ESTABLISHMENT_STATUS.DRAFT]: UI_VARIANTS.NEUTRAL,
    [ESTABLISHMENT_STATUS.ACTIVE]: UI_VARIANTS.SUCCESS,
};

const statusLabelLookup = defineMessages({
    [ESTABLISHMENT_STATUS.ACTIVE]: { defaultMessage: 'Public' },
    [ESTABLISHMENT_STATUS.DRAFT]: { defaultMessage: 'Brouillon' },
});

const EstablishmentStatusBadge = ({ status }) => (
    <Badge variant={statusVariantLookup[status]}>
        <FormattedMessage {...statusLabelLookup[status]} />
    </Badge>
);

EstablishmentStatusBadge.propTypes = {
    status: PropTypes.oneOf(Object.values(ESTABLISHMENT_STATUS)).isRequired,
};

export default EstablishmentStatusBadge;
