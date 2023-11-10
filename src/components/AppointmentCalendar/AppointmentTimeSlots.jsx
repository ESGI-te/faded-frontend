import PropTypes from 'prop-types';
import AppointmentTimeSlot from './AppointmentTimeSlot';
import { dayjs } from '@utils/dayjs';
import { useAppointmentCalendar } from './AppointmentCalendar';
import Stack from '@components/Stack';

/* TODO: Get data from api */
const TIME_SLOT_DURATION = 30;
const OPENING_HOURS = {
    open: dayjs().set('hour', 8).set('minute', 0),
    close: dayjs().set('hour', 20).set('minute', 0),
};

const generateTimeSlots = () => {
    const timeSlots = [];
    let openingTime = OPENING_HOURS.open.clone();

    while (openingTime.isSameOrBefore(OPENING_HOURS.close)) {
        const timeSlot = openingTime.format('HH:mm');
        timeSlots.push(timeSlot);
        openingTime = openingTime.add(TIME_SLOT_DURATION, 'minutes');
    }

    return timeSlots;
};

const AppointmentTimeSlots = ({ date, ...props }) => {
    const { onChange } = useAppointmentCalendar();
    const timeSlots = generateTimeSlots();

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
                >
                    {timeSlot}
                </AppointmentTimeSlot>
            ))}
        </Stack>
    );
};

AppointmentTimeSlots.propTypes = {
    date: PropTypes.object.isRequired,
};

export default AppointmentTimeSlots;
