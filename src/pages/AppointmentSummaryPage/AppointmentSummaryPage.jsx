import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import Text from '@components/Text';
import useAppointmentQuery from '@queries/appointment/useAppointmentQuery.hook';
import { Link, useParams } from 'react-router-dom';
import Button from '@components/Button';
import { useEffect, useState } from 'react';
import Confetti from 'react-dom-confetti';
import { dayjs } from '@utils/dayjs';
import Cluster from '@components/Cluster';
import Stack from '@components/Stack';
import { Separator } from 'react-aria-components';
import AppointmentSummaryPageSkeleton from './AppointmentSummaryPageSkeleton';
import { FormattedMessage } from 'react-intl';

const CONFETTI_LEFT_CONFIG = {
    angle: '45',
    spread: '80',
    startVelocity: '42',
    elementCount: '100',
    dragFriction: '0.07',
    duration: '3500',
    stagger: '0',
    width: '12px',
    height: '5px',
    colors: ['#7881DC', '#3D8F89', '#FF264A'],
};

const CONFETTI_RIGHT_CONFIG = {
    angle: '135',
    spread: '80',
    startVelocity: '42',
    elementCount: '100',
    dragFriction: '0.07',
    duration: '3500',
    stagger: '0',
    width: '12px',
    height: '5px',
    colors: ['#7881DC', '#3D8F89', '#FF264A'],
};
const AppointmentSummaryPage = () => {
    const { appointmentId } = useParams();
    const { data: appointment, isLoading } = useAppointmentQuery(appointmentId);
    const [confettiIsActive, setConfettiIsActive] = useState(false);

    useEffect(() => {
        if (isLoading) return;
        setTimeout(() => setConfettiIsActive(true), 1000);
        return () => setConfettiIsActive(false);
    }, [isLoading]);

    if (isLoading) return <AppointmentSummaryPageSkeleton />;

    return (
        <Page>
            <PageInnerWrapper>
                <CalendarIcon icon={icon({ name: 'calendar-check', style: 'regular' })} />
                <Title>
                    <FormattedMessage defaultMessage="Bravo ! Votre rendez-vous est confirmé." />
                </Title>
                <Summary>
                    <EstablishmentTitleWrapper>
                        <EstablishmentImageWrapper></EstablishmentImageWrapper>
                        <Stack gap="0.25rem">
                            <Text fontWeight="--fw-semibold" variant="bodyXL">
                                {appointment.establishment.name}
                            </Text>
                            <Text>{appointment.establishment.address}</Text>
                        </Stack>
                    </EstablishmentTitleWrapper>
                    <Cluster gap="0.5rem" align="center">
                        <SmallCalendarIcon icon={icon({ name: 'calendar', style: 'regular' })} />
                        <Text>{dayjs(appointment.dateTime).format('dddd DD MMMM YYYY HH:mm')}</Text>
                    </Cluster>
                    <Cluster gap="0.5rem" align="center">
                        <SmallCalendarIcon
                            icon={icon({ name: 'wand-magic-sparkles', style: 'solid' })}
                        />
                        <AppointmentService>
                            <Text variant="bodyL">{appointment.service.name}</Text>
                            <Cluster gap="0.5rem" align="center" justify="space-between">
                                <Text color="--neutral500">{appointment.service.duration} min</Text>
                                <Divider />
                                <Text color="--neutral500">{appointment.service.price} €</Text>
                            </Cluster>
                        </AppointmentService>
                    </Cluster>
                    <AppointmentsButton forwardedAs={Link} to="/profile/appointments">
                        <FormattedMessage defaultMessage="Mes rendez-vous" />
                    </AppointmentsButton>
                </Summary>
            </PageInnerWrapper>
            <ConfettiLeftWrapper>
                <Confetti active={confettiIsActive} config={CONFETTI_LEFT_CONFIG} />
            </ConfettiLeftWrapper>
            <ConfettiRightWrapper>
                <Confetti active={confettiIsActive} config={CONFETTI_RIGHT_CONFIG} />
            </ConfettiRightWrapper>
        </Page>
    );
};

const Page = styled.section`
    min-height: 100%;
    width: 100%;
    display: flex;
    background-color: var(--neutral50);
    justify-content: center;
`;
const PageInnerWrapper = styled.div`
    width: fit-content;
    background-color: var(--neutral50);
    padding: var(--container-padding-mobile);
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 1rem;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        row-gap: 2rem;
        padding: var(--container-padding);
    }
`;
const AppointmentsButton = styled(Button)`
    margin-top: 0.75rem;
    background-color: var(--black);
`;
const CalendarIcon = styled(FontAwesomeIcon)`
    width: 4rem;
    height: 4rem;
    color: var(--success500);
`;
const SmallCalendarIcon = styled(FontAwesomeIcon)`
    width: 1rem;
    height: 1rem;
    color: var(--black);
`;
const ConfettiLeftWrapper = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
`;
const ConfettiRightWrapper = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
`;
const Summary = styled.div`
    align-self: stretch;
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    background-color: var(--white);
    border-radius: var(--r-m);
    padding: var(--container-padding-mobile);

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        padding: var(--container-padding);
        row-gap: 1.5rem;
    }
`;
const EstablishmentImageWrapper = styled.div`
    height: 4rem;
    width: 4rem;
    border-radius: var(--r-s);
    background-color: var(--neutral50);
`;
const EstablishmentTitleWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: start;
    column-gap: 1rem;
    align-self: stretch;
`;
const AppointmentService = styled.div`
    display: flex;
    align-items: center;
    column-gap: 1rem;
    align-self: stretch;
`;
const Divider = styled(Separator)`
    width: 0.25rem;
    height: 0.25rem;
    background-color: var(--neutral300);
    border-radius: var(--r-full);
`;
const Title = styled(Text)`
    font-weight: var(--fw-bold);
    font-size: var(--fs-heading-l);
    line-height: var(--fs-heading-l);
    text-align: center;
`;
export default AppointmentSummaryPage;
