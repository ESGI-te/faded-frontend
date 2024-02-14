import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Text from 'shared/src/components/Text';
import { useLocale } from 'react-aria';
import { LOCALES } from '@contexts/IntlProvider';
import { FormattedMessage } from 'react-intl';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const daysLookup = {
    monday: 'lundi',
    tuesday: 'mardi',
    wednesday: 'mercredi',
    thursday: 'jeudi',
    friday: 'vendredi',
    saturday: 'samedi',
    sunday: 'dimanche',
};

const EstablishmentPlanning = ({ planning }) => {
    const today = dayjs().format('dddd').toLowerCase();
    const { locale } = useLocale();

    return (
        <Wrapper>
            {Object.entries(planning).map(([day, hours]) => (
                <Day key={day} isToday={today === day}>
                    <DayName>{locale === LOCALES.FR ? daysLookup[day] : day}</DayName>
                    <Text>
                        {!hours.isOpen ? (
                            <FormattedMessage defaultMessage="Fermé" />
                        ) : (
                            `${dayjs(hours.open, 'HH:mm').format('HH:mm')} - ${dayjs(
                                hours.close,
                                'HH:mm',
                            ).format('HH:mm')}`
                        )}
                    </Text>
                </Day>
            ))}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 1.5rem;
    border-radius: var(--r-s);
    background-color: var(--white);
`;
const Day = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    & > * {
        color: var(--neutral500);
        font-size: var(--fs-bodyL);

        ${({ isToday }) =>
            isToday &&
            css`
                font-weight: var(--fw-semibold);
                color: var(--black);
            `}
    }

    &:not(:first-child) {
        padding-top: 1rem;
    }

    &:not(:last-child) {
        border-bottom: 1px solid var(--neutral100);
        padding-bottom: 1rem;
    }
`;
const DayName = styled(Text)`
    text-transform: capitalize;
`;

EstablishmentPlanning.propTypes = {
    planning: PropTypes.shape({
        monday: PropTypes.shape({
            open: PropTypes.string.isRequired,
            close: PropTypes.string.isRequired,
            isOpen: PropTypes.bool.isRequired,
        }).isRequired,
        tuesday: PropTypes.shape({
            open: PropTypes.string.isRequired,
            close: PropTypes.string.isRequired,
            isOpen: PropTypes.bool.isRequired,
        }).isRequired,
        wednesday: PropTypes.shape({
            open: PropTypes.string.isRequired,
            close: PropTypes.string.isRequired,
            isOpen: PropTypes.bool.isRequired,
        }).isRequired,
        thursday: PropTypes.shape({
            open: PropTypes.string.isRequired,
            close: PropTypes.string.isRequired,
            isOpen: PropTypes.bool.isRequired,
        }).isRequired,
        friday: PropTypes.shape({
            open: PropTypes.string.isRequired,
            close: PropTypes.string.isRequired,
            isOpen: PropTypes.bool.isRequired,
        }).isRequired,
        saturday: PropTypes.shape({
            open: PropTypes.string.isRequired,
            close: PropTypes.string.isRequired,
            isOpen: PropTypes.bool.isRequired,
        }).isRequired,
        sunday: PropTypes.shape({
            open: PropTypes.string.isRequired,
            close: PropTypes.string.isRequired,
            isOpen: PropTypes.bool.isRequired,
        }).isRequired,
    }).isRequired,
};

export default EstablishmentPlanning;
