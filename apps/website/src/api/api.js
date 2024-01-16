import { callApi } from 'shared/src/api';

export const getEstablishmentsSearch = ({ page, perPage, ...q }) =>
    callApi('/establishments/search', {
        query: { ...q, page, perPage },
    });
export const getEstablishmentSuggestions = ({ page, perPage, name }) =>
    callApi('/establishments/suggestions', {
        query: { name, page, perPage },
    });
export const createAppointment = (appointment) =>
    callApi('/appointments', { method: 'POST', data: appointment });
export const getAppointment = (appointmentId) => callApi(`/appointments/${appointmentId}`);
