import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Button from 'shared/src/components/Button';

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

    ${({ isUnavailable }) =>
        isUnavailable &&
        css`
            text-decoration-line: line-through;
            opacity: 0.5;
            pointer-events: none;
        `};
`;

AppointmentTimeSlot.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppointmentTimeSlot;
