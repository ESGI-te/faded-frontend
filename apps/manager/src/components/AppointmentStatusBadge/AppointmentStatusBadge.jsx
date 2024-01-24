import PropTypes from 'prop-types';
import { APPOINTMENT_STATUS, UI_VARIANTS } from 'shared/src/utils/constants';
import { defineMessages, FormattedMessage } from 'react-intl';
import Badge from 'shared/src/components/Badge';

const statusVariantLookup = {
    [APPOINTMENT_STATUS.PLANNED]: UI_VARIANTS.INFO,
    [APPOINTMENT_STATUS.CANCELED]: UI_VARIANTS.ALERT,
    [APPOINTMENT_STATUS.FINISHED]: UI_VARIANTS.SUCCESS,
};

const statusLabelLookup = defineMessages({
    [APPOINTMENT_STATUS.PLANNED]: { defaultMessage: 'À venir' },
    [APPOINTMENT_STATUS.CANCELED]: { defaultMessage: 'Annulé' },
    [APPOINTMENT_STATUS.FINISHED]: { defaultMessage: 'Terminé' },
});

const AppointmentStatusBadge = ({ status }) => (
    <Badge variant={statusVariantLookup[status]}>
        <FormattedMessage {...statusLabelLookup[status]} />
    </Badge>
);

AppointmentStatusBadge.propTypes = {
    status: PropTypes.oneOf(Object.values(APPOINTMENT_STATUS)).isRequired,
};

export default AppointmentStatusBadge;
