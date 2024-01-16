import PropTypes from 'prop-types';
import { APPOINTMENT_STATUS } from 'shared/src/utils/constants';
import { defineMessages, FormattedMessage } from 'react-intl';
import styled from 'styled-components';

const statusColorLookup = {
    [APPOINTMENT_STATUS.PLANNED]: '--info',
    [APPOINTMENT_STATUS.CANCELED]: '--alert',
    [APPOINTMENT_STATUS.FINISHED]: '--success',
};

const statusLabelLookup = defineMessages({
    [APPOINTMENT_STATUS.PLANNED]: { defaultMessage: 'À venir' },
    [APPOINTMENT_STATUS.CANCELED]: { defaultMessage: 'Annulé' },
    [APPOINTMENT_STATUS.FINISHED]: { defaultMessage: 'Terminé' },
});

const AppointmentStatusBadge = ({ status }) => (
    <StatusBadge $status={status}>
        <FormattedMessage {...statusLabelLookup[status]} />
    </StatusBadge>
);

const StatusBadge = styled.div`
    background-color: var(${({ $status }) => statusColorLookup[$status]}50);
    color: var(${({ $status }) => statusColorLookup[$status]}500);
    border-radius: var(--r-s);
    padding-inline: 0.5rem;
    padding-block: 0.25rem;
    font-size: var(--fs-body-s);
    font-weight: var(--fw-semibold);
    width: fit-content;
`;

AppointmentStatusBadge.propTypes = {
    status: PropTypes.oneOf(Object.values(APPOINTMENT_STATUS)).isRequired,
};

export default AppointmentStatusBadge;
