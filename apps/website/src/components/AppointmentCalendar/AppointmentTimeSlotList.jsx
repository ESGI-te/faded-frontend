import PropTypes from 'prop-types';
import AppointmentTimeSlot from './AppointmentTimeSlot';
import { dayjs } from '@utils/dayjs';
import { useAppointmentCalendar } from './AppointmentCalendar';
import Stack from 'shared/src/components/Stack';

const AppointmentTimeSlotList = ({ date, timeSlots, unavailableTimeSlots, ...props }) => {
    const { onChange } = useAppointmentCalendar();

    const formatDateTime = (time) => {
        const formattedDate = dayjs(`${date.year}-${date.month}-${date.day}`);
        const formattedDateTime = formattedDate
            .set('hour', time.split(':')[0])
            .set('minute', time.split(':')[1])
            .toISOString();
        return formattedDateTime;
    };

    const handleSelectTimeSlot = (time) => {
        const dateTime = formatDateTime(time);
        onChange(dateTime);
    };

    return (
        <Stack gap="0.5rem">
            {timeSlots.map((timeSlot) => (
                <AppointmentTimeSlot
                    {...props}
                    key={timeSlot}
                    onPress={() => handleSelectTimeSlot(timeSlot)}
                    isUnavailable={unavailableTimeSlots?.includes(timeSlot)}
                >
                    {timeSlot}
                </AppointmentTimeSlot>
            ))}
        </Stack>
    );
};

AppointmentTimeSlotList.propTypes = {
    date: PropTypes.object.isRequired,
    timeSlots: PropTypes.arrayOf(PropTypes.string).isRequired,
    unavailableTimeSlots: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AppointmentTimeSlotList;
