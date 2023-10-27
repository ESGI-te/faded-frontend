import AppointmentTimeSlots from '@components/AppointmentTimeSlots';
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
            <CellInnerWrapper isUnavailable={isUnavailable}>
                {(!isUnavailable || isDisabled) && (
                    <AppointmentTimeSlots {...buttonProps} date={date} ref={ref} />
                )}
            </CellInnerWrapper>
        </Cell>
    );
};

const CellInnerWrapper = styled.div``;
const Cell = styled.td``;

export default AppointmentCalendarCell;
