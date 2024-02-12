import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import Stack from 'shared/src/components/Stack';
import Text from 'shared/src/components/Text';
import { FormattedMessage } from 'react-intl';

const OverviewGlobalIndicators = ({ className, indicators }) => (
    <Wrapper className={className}>
        <TurnoverCard>
            <TurnoverIconWrapper>
                <Icon icon={icon({ name: 'dollar-sign', style: 'solid' })} />
            </TurnoverIconWrapper>
            <Stack>
                <Text fontWeight="--fw-bold" variant="bodyL">
                    {indicators?.turnovers || 0} €
                </Text>
                <Text color="--neutral500">
                    <FormattedMessage defaultMessage="Chiffre d'affaire" />
                </Text>
            </Stack>
        </TurnoverCard>
        <AppointmentsCard>
            <AppointmentsIconWrapper>
                <Icon icon={icon({ name: 'calendar-check', style: 'solid' })} />
            </AppointmentsIconWrapper>
            <Stack>
                <Text fontWeight="--fw-bold" variant="bodyL">
                    {indicators?.appointments}
                </Text>
                <Text color="--neutral500">
                    <FormattedMessage defaultMessage="Nombre de RDV" />
                </Text>
            </Stack>
        </AppointmentsCard>
        <FeedbackCard>
            <ServicesIconWrapper>
                <Icon icon={icon({ name: 'star-half-stroke', style: 'solid' })} />
            </ServicesIconWrapper>
            <Stack>
                <Text fontWeight="--fw-bold" variant="bodyL">
                    {indicators?.averageFeedback}
                </Text>
                <Text color="--neutral500">
                    <FormattedMessage defaultMessage="Moyenne des feedbacks" />
                </Text>
            </Stack>
        </FeedbackCard>
    </Wrapper>
);

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    width: 100%;
`;
const Icon = styled(FontAwesomeIcon)`
    font-size: 1rem;
`;
const IconWrapper = styled.div`
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: var(--r-s);
`;
const TurnoverIconWrapper = styled(IconWrapper)`
    background-color: var(--success100);

    & > ${Icon} {
        color: var(--success500);
    }
`;
const AppointmentsIconWrapper = styled(IconWrapper)`
    background-color: var(--primary200);

    & > ${Icon} {
        color: var(--primary500);
    }
`;
const ServicesIconWrapper = styled(IconWrapper)`
    background-color: var(--info100);

    & > ${Icon} {
        color: var(--info500);
    }
`;
const IndicatorCard = styled.div`
    padding: 1rem;
    height: 4.5rem;
    border-radius: var(--r-m);
    display: flex;
    align-items: center;
    column-gap: 1rem;
    flex: 1;
`;
const TurnoverCard = styled(IndicatorCard)`
    background-color: var(--success50);
`;
const AppointmentsCard = styled(IndicatorCard)`
    background-color: var(--primary100);
`;
const FeedbackCard = styled(IndicatorCard)`
    background-color: var(--info50);
`;

export default OverviewGlobalIndicators;
