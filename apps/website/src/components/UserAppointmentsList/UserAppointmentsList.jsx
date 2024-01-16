import Stack from 'shared/src/components/Stack';
import Text from 'shared/src/components/Text';
import UserAppointmentCard from '@components/UserAppointmentCard';
import { FormattedMessage } from 'react-intl';

const UserAppointmentsList = ({ appointments }) => {
    if (appointments.length === 0)
        return (
            <Text variant="bodyL">
                <FormattedMessage defaultMessage="Vous n'avez pas de rendez-vous" />
            </Text>
        );

    return (
        <Stack gap="1rem">
            {appointments.map((appointment) => (
                <UserAppointmentCard key={appointment.id} appointment={appointment} />
            ))}
        </Stack>
    );
};

export default UserAppointmentsList;
