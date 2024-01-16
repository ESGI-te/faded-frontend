import AppointmentTimeSlots from './AppointmentTimeSlots';
import { useRef } from 'react';
import { useCalendarCell } from 'react-aria';
import styled from 'styled-components';

const AppointmentCalendarCell = ({ state, date }) => {
    let ref = useRef(null);
    let { cellProps, buttonProps, isDisabled, isUnavailable } = useCalendarCell(
        { date },
        state,
        ref,
    );

    return (
        <Cell {...cellProps} isUnavailable={isUnavailable}>
            <AppointmentTimeSlots
                {...buttonProps}
                date={date}
                ref={ref}
                isDisabled={isDisabled}
                isUnavailable={isUnavailable}
            />
        </Cell>
    );
};

const Cell = styled.td``;

export default AppointmentCalendarCell;
