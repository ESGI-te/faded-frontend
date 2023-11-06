import { useCalendarGrid } from 'react-aria';
import AppointmentCalendarCell from './AppointmentCalendarCell';
import { useIntl } from 'react-intl';
import { LOCALES } from '@contexts/IntlProvider';
import styled, { css } from 'styled-components';
import { getDayOfWeek } from '@internationalized/date';
import Stack from '@components/Stack';

const weekDayLookup = {
    [LOCALES.EN]: {
        0: 'Sun.',
        1: 'Mon.',
        2: 'Tue.',
        3: 'Wed.',
        4: 'Thu.',
        5: 'Fri.',
        6: 'Sat.',
    },
    [LOCALES.FR]: {
        0: 'Lun.',
        1: 'Mar.',
        2: 'Mer.',
        3: 'Jeu.',
        4: 'Ven.',
        5: 'Sam.',
        6: 'Dim.',
    },
};

const monthLookup = {
    [LOCALES.EN]: {
        1: 'Jan.',
        2: 'Feb.',
        3: 'Mar.',
        4: 'Apr.',
        5: 'May',
        6: 'Jun.',
        7: 'Jul.',
        8: 'Aug.',
        9: 'Sep.',
        10: 'Oct.',
        11: 'Nov.',
        12: 'Dec.',
    },
    [LOCALES.FR]: {
        1: 'Janv.',
        2: 'Fév.',
        3: 'Mars',
        4: 'Avr.',
        5: 'Mai',
        6: 'Juin',
        7: 'Juil.',
        8: 'Août',
        9: 'Sept.',
        10: 'Oct.',
        11: 'Nov.',
        12: 'Déc.',
    },
};

const AppointmentCalendarGrid = ({ state, ...props }) => {
    const { locale } = useIntl();
    let { gridProps, headerProps } = useCalendarGrid(props, state);

    return (
        <Table {...gridProps}>
            <thead {...headerProps}>
                <tr>
                    {state.getDatesInWeek(0).map((date, i) => (
                        <HeaderCell key={i} isUnavailable={state.isCellUnavailable(date)}>
                            <Stack gap="0.25rem" align="center" justify="center">
                                <span>{weekDayLookup[locale][getDayOfWeek(date, locale)]}</span>
                                <span key={i}>{`${date.day} ${
                                    monthLookup[locale][date.month]
                                }`}</span>
                            </Stack>
                        </HeaderCell>
                    ))}
                </tr>
            </thead>
            <tbody>
                <tr>
                    {state
                        .getDatesInWeek(0)
                        .map((date, i) =>
                            date ? (
                                <AppointmentCalendarCell key={i} state={state} date={date} />
                            ) : (
                                <td key={i} />
                            ),
                        )}
                </tr>
            </tbody>
        </Table>
    );
};

const Table = styled.table`
    width: 100%;
    text-align: center;
`;
const HeaderCell = styled.th`
    ${({ isUnavailable }) =>
        isUnavailable &&
        css`
            color: var(--neutral500);
            opacity: 0.5;
        `}
`;

export default AppointmentCalendarGrid;
