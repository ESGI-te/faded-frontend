import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import Stack from 'shared/src/components/Stack';
import Text from 'shared/src/components/Text';
import { FormattedMessage } from 'react-intl';

const OverviewDailyIndicators = ({ className, indicators }) => {
    console.log('indicators', indicators);
    return (
        <Wrapper className={className}>
            <IndicatorCard>
                <TurnoverIconWrapper>
                    <Icon icon={icon({ name: 'dollar-sign', style: 'solid' })} />
                </TurnoverIconWrapper>
                <Stack>
                    <Text fontWeight="--fw-bold" variant="bodyL">
                        {indicators?.dailyTurnover || 0} €
                    </Text>
                    <Text color="--neutral500">
                        <FormattedMessage defaultMessage="Chiffre d'affaire" />
                    </Text>
                </Stack>
                <Percentage>
                    <FormattedMessage
                        defaultMessage="1.5% of total cash flow"
                    />
                </Percentage>
            </IndicatorCard>
            <IndicatorCard>
                <ServicesIconWrapper>
                    <Icon icon={icon({ name: 'user', style: 'solid' })} />
                </ServicesIconWrapper>
                <Stack>
                    <Text fontWeight="--fw-bold" variant="bodyL">
                        {indicators?.newUsers || 0}
                    </Text>
                    <Text color="--neutral500">
                        <FormattedMessage defaultMessage="Account" />
                    </Text>
                </Stack>
                <Percentage>
                    <FormattedMessage
                        defaultMessage="new daily users"
                    />
                </Percentage>
            </IndicatorCard>
            <IndicatorCard>
                <AppointmentsIconWrapper>
                    <Icon icon={icon({ name: 'users', style: 'solid' })} />
                </AppointmentsIconWrapper>
                <Stack>
                    <Text fontWeight="--fw-bold" variant="bodyL">
                        {indicators?.totalProviders || 0}
                    </Text>
                    <Text color="--neutral500">
                        <FormattedMessage defaultMessage="Organization" />
                    </Text>
                </Stack>
                <Percentage>
                    <FormattedMessage
                        defaultMessage="Total number of providers"
                    />
                </Percentage>
            </IndicatorCard>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    width: 100%;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        flex-direction: row;
        column-gap: 1rem;
    }
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
    background-color: var(--success50);

    & > ${Icon} {
        color: var(--success500);
    }
`;
const AppointmentsIconWrapper = styled(IconWrapper)`
    background-color: var(--primary100);

    & > ${Icon} {
        color: var(--primary500);
    }
`;
const ServicesIconWrapper = styled(IconWrapper)`
    background-color: var(--info50);

    & > ${Icon} {
        color: var(--info500);
    }
`;
const IndicatorCard = styled.div`
    padding: 1rem;
    height: 4.5rem;
    border-radius: var(--r-m);
    background-color: var(--white);
    display: flex;
    align-items: center;
    column-gap: 1rem;
    flex: 1;
`;
const Percentage = styled.p`
    color: var(--info500);
    font-size: var(--fs-body-s);
    margin-left: auto;
    align-self: flex-start;
`;

export default OverviewDailyIndicators;
