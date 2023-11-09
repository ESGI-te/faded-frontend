import { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Text from '@components/Text';
import { dayjs } from '@utils/dayjs';

const EstablishmentOpeningHours = ({ openingHours }) => {
    const { id, ...hours } = openingHours;
    const formattedOpeningHours = useMemo(() => {
        const formattedHours = {};
        Object.entries(hours).forEach(
            ([key, value]) => (formattedHours[key] = dayjs(value).format('HH:mm')),
        );
        return formattedHours;
    }, [hours]);
    const today = dayjs().format('dddd').toLowerCase();

    return (
        <Wrapper>
            <Day isToday={today === 'monday'}>
                <Text>Lundi</Text>
                <Text>
                    {formattedOpeningHours.mondayOpen} - {formattedOpeningHours.mondayClose}
                </Text>
            </Day>
            <Day isToday={today === 'tuesday'}>
                <Text>Mardi</Text>
                <Text>
                    {formattedOpeningHours.tuesdayOpen} - {formattedOpeningHours.tuesdayClose}
                </Text>
            </Day>
            <Day isToday={today === 'wednesday'}>
                <Text>Mercredi</Text>
                <Text>
                    {formattedOpeningHours.wednesdayOpen} - {formattedOpeningHours.wednesdayClose}
                </Text>
            </Day>
            <Day isToday={today === 'thursday'}>
                <Text>Jeudi</Text>
                <Text>
                    {formattedOpeningHours.thursdayOpen} - {formattedOpeningHours.thursdayClose}
                </Text>
            </Day>
            <Day isToday={today === 'friday'}>
                <Text>Vendredi</Text>
                <Text>
                    {formattedOpeningHours.fridayOpen} - {formattedOpeningHours.fridayClose}
                </Text>
            </Day>
            <Day isToday={today === 'saturday'}>
                <Text>Samedi</Text>
                <Text>
                    {formattedOpeningHours.saturdayOpen} - {formattedOpeningHours.saturdayClose}
                </Text>
            </Day>
            <Day isToday={today === 'sunday'}>
                <Text>Dimanche</Text>
                <Text>
                    {formattedOpeningHours.sundayOpen} - {formattedOpeningHours.sundayClose}
                </Text>
            </Day>
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

EstablishmentOpeningHours.propTypes = {
    openingHours: PropTypes.shape({
        id: PropTypes.number.isRequired,
        mondayOpen: PropTypes.string.isRequired,
        mondayClose: PropTypes.string.isRequired,
        tuesdayOpen: PropTypes.string.isRequired,
        tuesdayClose: PropTypes.string.isRequired,
        wednesdayOpen: PropTypes.string.isRequired,
        wednesdayClose: PropTypes.string.isRequired,
        thursdayOpen: PropTypes.string.isRequired,
        thursdayClose: PropTypes.string.isRequired,
        fridayOpen: PropTypes.string.isRequired,
        fridayClose: PropTypes.string.isRequired,
        saturdayOpen: PropTypes.string.isRequired,
        saturdayClose: PropTypes.string.isRequired,
        sundayOpen: PropTypes.string.isRequired,
        sundayClose: PropTypes.string.isRequired,
    }).isRequired,
};

export default EstablishmentOpeningHours;
