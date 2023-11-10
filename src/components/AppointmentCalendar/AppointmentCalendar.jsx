import { useCalendar } from 'react-aria';
import { useCalendarState } from 'react-stately';
import { createCalendar, getLocalTimeZone, today } from '@internationalized/date';
import styled from 'styled-components';
import AppointmentCalendarGrid from './AppointmentCalendarGrid';
import { useIntl } from 'react-intl';
import IconButton from '@components/IconButton';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createContext, useContext } from 'react';

const AppointmentCalendarContext = createContext({});

const AppointmentCalendar = ({ onChange, ...props }) => {
    const { locale } = useIntl();
    let now = today(getLocalTimeZone());
    const state = useCalendarState({
        ...props,
        visibleDuration: { weeks: 1 },
        isDateUnavailable: (date) => date.compare(now) < 0,
        locale,
        createCalendar,
    });

    const { calendarProps, prevButtonProps, nextButtonProps, title } = useCalendar(props, state);

    return (
        <Calendar {...calendarProps}>
            <CalendarHeader>
                <IconButton
                    {...prevButtonProps}
                    variant="ghost"
                    icon={<ArrowIcon icon={icon({ name: 'arrow-left', style: 'solid' })} />}
                />
                <h2>{title}</h2>
                <IconButton
                    {...nextButtonProps}
                    variant="ghost"
                    icon={<ArrowIcon icon={icon({ name: 'arrow-right', style: 'solid' })} />}
                />
            </CalendarHeader>
            <AppointmentCalendarContext.Provider value={{ onChange }}>
                <AppointmentCalendarGrid state={state} />
            </AppointmentCalendarContext.Provider>
        </Calendar>
    );
};

const Calendar = styled.div`
    /* display: flex;
    flex-direction: column;
    row-gap: 1rem; */
    width: 100%;
`;
const CalendarHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const ArrowIcon = styled(FontAwesomeIcon)`
    font-size: 1.5rem;
    color: var(--black);
`;

export const useAppointmentCalendar = () => useContext(AppointmentCalendarContext);

export default AppointmentCalendar;
