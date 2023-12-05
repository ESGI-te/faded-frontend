import Stack from "@components/Stack"
import Text from "@components/Text"
import UserAppointmentCard from "@components/UserAppointmentCard"
import { FormattedMessage } from "react-intl"

const UserAppointmentsList = ({ appointments }) => {
    return (
        <Stack gap="1rem">
            {appointments.map((appointment) => (
                <UserAppointmentCard key={appointment.id} appointment={appointment} />
            ))}
        </Stack>
    )
}

export default UserAppointmentsList