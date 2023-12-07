import Cluster from '@components/Cluster';
import Text from '@components/Text';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { dayjs } from '@utils/dayjs';
import styled from 'styled-components';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Separator } from 'react-aria-components';
import Button from '@components/Button';
import { FormattedMessage, defineMessages } from 'react-intl';
import useCancelAppointmentMutation from '@queries/appointment/useCancelAppointmentMutation.hook';
import { APPOINTMENT_STATUS } from '@utils/constants';
import Link from '@components/Link';
import useGoogleCalendarEventLink from '@hooks/useGoogleCalendarEventLink.hook';

const statusColorLookup = {
    [APPOINTMENT_STATUS.PLANNED]: '--info',
    [APPOINTMENT_STATUS.CANCELED]: '--alert',
    [APPOINTMENT_STATUS.FINISHED]: '--success',
};

const statusLabelLookup = defineMessages({
    [APPOINTMENT_STATUS.PLANNED]: { defaultMessage: 'À venir' },
    [APPOINTMENT_STATUS.CANCELED]: { defaultMessage: 'Annulé' },
    [APPOINTMENT_STATUS.FINISHED]: { defaultMessage: 'Terminé' },
});

const UserAppointmentCard = ({ appointment }) => {
    const cancelAppointment = useCancelAppointmentMutation();
    const isPlanned = appointment.status === APPOINTMENT_STATUS.PLANNED;
    const link = useGoogleCalendarEventLink(appointment);

    return (
        <Card>
            <Cluster justify="space-between" align="center">
                <Text variant="bodyL" fontWeight="--fw-semibold">
                    {dayjs(appointment.dateTime).format('dddd DD MMMM YYYY HH:mm')}
                </Text>
                <StatusBadge status={appointment.status}>
                    <FormattedMessage {...statusLabelLookup[appointment.status]} />
                </StatusBadge>
            </Cluster>
            <Cluster gap="1rem" align="center">
                <ImageWrapper>
                    {/* TODO: Use actual image here and remove background color */}
                </ImageWrapper>
                <Link to={`/establishments/${appointment.establishment.id}`}>
                    {appointment.establishment.name}
                </Link>
            </Cluster>
            <Cluster gap="0.5rem" align="center">
                <Icon icon={icon({ name: 'location-dot', style: 'solid' })} />
                <InformationText>{appointment.establishment.address}</InformationText>
            </Cluster>
            <ResponsiveWrapper>
                <Cluster gap="0.5rem" align="center">
                    <Icon icon={icon({ name: 'wand-magic-sparkles', style: 'solid' })} />
                    <InformationText>{appointment.service.name}</InformationText>
                </Cluster>
                <Cluster gap="0.5rem" align="center">
                    <Cluster gap="0.5rem" align="center">
                        <Icon icon={icon({ name: 'clock', style: 'solid' })} />
                        <InformationText>{appointment.service.duration} min</InformationText>
                    </Cluster>
                    <Divider />
                    <Cluster gap="0.5rem" align="center">
                        <Icon icon={icon({ name: 'money-bill-wave', style: 'solid' })} />
                        <InformationText>{appointment.service.price} €</InformationText>
                    </Cluster>
                </Cluster>
            </ResponsiveWrapper>
            <Cluster gap="0.5rem" align="center">
                <Icon icon={icon({ name: 'scissors', style: 'solid' })} />
                <InformationText>Avec {appointment.barber.firstName}</InformationText>
            </Cluster>
            {isPlanned && (
                <ActionsWrapper>
                    <PostponeButton>
                        <FormattedMessage defaultMessage="Déplacer le rdv" />
                    </PostponeButton>
                    <ActionsInnerWrapper>
                        <Link to={link} target="_blank">
                            <FormattedMessage defaultMessage="Ajouter à mon agenda" />
                        </Link>
                        <TextButton onPress={() => cancelAppointment.mutate(appointment.id)}>
                            <FormattedMessage defaultMessage="Annuler le RDV" />
                        </TextButton>
                    </ActionsInnerWrapper>
                </ActionsWrapper>
            )}
        </Card>
    );
};

const Card = styled.div`
    background-color: var(--white);
    border-radius: var(--r-s);
    box-shadow: 0 0.125rem 0.25rem rgb(0 0 0 / 8%);
    padding: 1rem;
    row-gap: 1rem;
    display: flex;
    flex-direction: column;
`;
const ImageWrapper = styled.div`
    background-color: var(--neutral50);
    border-radius: var(--r-s);
    height: 4rem;
    width: 4rem;
`;
const Icon = styled(FontAwesomeIcon)`
    width: 1rem;
    height: 1rem;
    color: var(--neutral300);
`;
const Divider = styled(Separator)`
    width: 0.25rem;
    height: 0.25rem;
    background-color: var(--neutral300);
    border-radius: var(--r-full);
`;
const InformationText = styled(Text)`
    color: var(--neutral500);
`;
const ActionsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    margin-top: 1rem;
`;
const PostponeButton = styled(Button)`
    background-color: var(--black);
    align-self: stretch;
`;
const TextButton = styled(Button)`
    background: none;
    padding-inline: 0;
    padding-block: 0;
    border-radius: 0;
    color: var(--black);
    font-size: var(--fs-bodyM);
    font-weight: var(--fw-normal);

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        padding-bottom: 0.125rem;
        border-bottom: solid 1px var(--neutral500);
    }
`;
const ActionsInnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        column-gap: 1rem;
    }
`;
const ResponsiveWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        flex-direction: row;
        column-gap: 1rem;
    }
`;
const StatusBadge = styled.div`
    background-color: var(${({ status }) => statusColorLookup[status]}50);
    color: var(${({ status }) => statusColorLookup[status]}500);
    border-radius: var(--r-s);
    padding-inline: 0.5rem;
    padding-block: 0.25rem;
    font-size: var(--fs-body-s);
    font-weight: var(--fw-semibold);
`;

export default UserAppointmentCard;
