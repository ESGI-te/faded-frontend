import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import Stack from 'shared/src/components/Stack';
import Text from 'shared/src/components/Text';
import { FormattedMessage } from 'react-intl';

const OverviewDailyIndicators = ({ className, indicators }) => {
    return (
        <Wrapper className={className}>
            <IndicatorCard>
                <TurnoverIconWrapper>
                    <Icon icon={icon({ name: 'dollar-sign', style: 'solid' })} />
                </TurnoverIconWrapper>
                <CardContent>
                    <CardHeader>
                        <Text fontWeight="--fw-bold" variant="bodyL">
                            {indicators?.turnover?.value || 0} €
                        </Text>
                        <Percentage>
                            <FormattedMessage
                                defaultMessage="{value} par rapport à hier"
                                values={{
                                    value: `${
                                        indicators?.turnover?.percentageChange < 0 ? '-' : '+'
                                    } ${indicators?.turnover?.percentageChange}%`,
                                }}
                            />
                        </Percentage>
                    </CardHeader>
                    <Text color="--neutral500">
                        <FormattedMessage defaultMessage="Chiffre d'affaire" />
                    </Text>
                </CardContent>
            </IndicatorCard>
            <IndicatorCard>
                <AppointmentsIconWrapper>
                    <Icon icon={icon({ name: 'calendar-check', style: 'solid' })} />
                </AppointmentsIconWrapper>
                <CardContent>
                    <CardHeader>
                        <Text fontWeight="--fw-bold" variant="bodyL">
                            {indicators?.appointments?.value}
                        </Text>
                        <Percentage>
                            <FormattedMessage
                                defaultMessage="{value} par rapport à hier"
                                values={{
                                    value: `${
                                        indicators?.appointments?.percentageChange < 0 ? '-' : '+'
                                    } ${indicators?.appointments?.percentageChange}%`,
                                }}
                            />
                        </Percentage>
                    </CardHeader>
                    <Text color="--neutral500">
                        <FormattedMessage defaultMessage="Rendez-vous" />
                    </Text>
                </CardContent>
            </IndicatorCard>
            <IndicatorCard>
                <ServicesIconWrapper>
                    <Icon icon={icon({ name: 'wand-magic-sparkles', style: 'solid' })} />
                </ServicesIconWrapper>
                <CardContent>
                    <CardHeader>
                        <Text fontWeight="--fw-bold" variant="bodyL">
                            {indicators?.services?.value}
                        </Text>
                        <Percentage>
                            <FormattedMessage
                                defaultMessage="{value} par rapport à hier"
                                values={{
                                    value: `${
                                        indicators?.services?.percentageChange < 0 ? '-' : '+'
                                    } ${indicators?.services?.percentageChange}%`,
                                }}
                            />
                        </Percentage>
                    </CardHeader>
                    <Text color="--neutral500">
                        <FormattedMessage defaultMessage="Prestations différentes" />
                    </Text>
                </CardContent>
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
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
const CardHeader = styled.div`
    display: flex;
    width: 100%;
    min-width: 0;
    justify-content: space-between;
    column-gap: 1rem;

    & > :first-child {
        flex-shrink: 0;
    }
`;
const CardContent = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
`;

export default OverviewDailyIndicators;
