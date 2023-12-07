import { useIntl } from 'react-intl';
import { dayjs } from '@utils/dayjs';

const useGoogleCalendarEventLink = (appointment) => {
    const intl = useIntl();

    const googleEventDetails = {
        title: intl.formatMessage(
            { defaultMessage: 'Rendez-vous chez {establishmentName}' },
            { establishmentName: appointment.establishment.name },
        ),
        startDate: dayjs(appointment.dateTime).toDate(),
        endDate: dayjs(appointment.dateTime).add(appointment.service.duration, 'minute').toDate(),
        location: appointment.establishment.address,
        description: intl.formatMessage(
            {
                defaultMessage:
                    'Rendez-vous chez {establishmentName} pour la prestation {serviceName} avec {barberName}',
            },
            {
                establishmentName: appointment.establishment.name,
                serviceName: appointment.service.name,
                barberName: appointment.barber.firstName,
            },
        ),
    };
    const startTime = encodeURIComponent(
        googleEventDetails.startDate.toISOString().replace(/-|:|\.\d+/g, ''),
    );
    const endTime = encodeURIComponent(
        googleEventDetails.endDate.toISOString().replace(/-|:|\.\d+/g, ''),
    );

    const link = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
        googleEventDetails.title,
    )}&dates=${startTime}/${endTime}&details=${encodeURIComponent(
        googleEventDetails.description,
    )}&location=${encodeURIComponent(googleEventDetails.location)}`;

    return link;
};

export default useGoogleCalendarEventLink;
