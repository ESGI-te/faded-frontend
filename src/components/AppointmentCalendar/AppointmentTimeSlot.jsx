import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '@components/Button';

const AppointmentTimeSlot = ({ children, ...props }) => {
    return <TimeSlot {...props}>{children}</TimeSlot>;
};

const TimeSlot = styled(Button)`
    width: 100%;
    color: var(--black);
    background-color: var(--neutral50);
    font-size: var(--fs-body-m);
    padding: 0.25rem;

    &:hover {
        background-color: var(--neutral100);
    }
`;

AppointmentTimeSlot.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppointmentTimeSlot;
