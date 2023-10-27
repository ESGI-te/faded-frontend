import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '@components/Button';

const AppointmentTimeSlot = ({ children, ...props }) => {
    return (
        <TimeSlot variant="ghost" {...props}>
            {children}
        </TimeSlot>
    );
};

const TimeSlot = styled(Button)`
    width: 100%;
    border-radius: 0;
    color: var(--black);
`;

AppointmentTimeSlot.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppointmentTimeSlot;
