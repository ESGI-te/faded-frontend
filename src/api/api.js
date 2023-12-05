import { callApi } from './callApi';

/* Auth */
export const login = (credentials) => callApi('/login', { method: 'POST', data: credentials });
export const register = (user) => callApi('/users', { method: 'POST', data: user });
export const getUser = () => callApi('/auth/user');

export const getEstablishments = ({ page, perPage, ...q }) =>
    callApi('/establishments/search', {
        query: { ...q, page, perPage },
    });
export const getEstablishment = (establishmentId) => callApi(`/establishments/${establishmentId}`);
export const getEstablishmentServices = (establishmentId, query) =>
    callApi(`/services/establishment/${establishmentId}`, query);
export const getEstablishmentSuggestions = ({ page, perPage, name }) =>
    callApi('/establishments', {
        query: { name, page, perPage },
    });
export const getEstablishmentImages = (establishmentId, query) =>
    callApi(`/establishments/${establishmentId}/images`, query);

export const getAllFeedback = (establishmentId, { page, perPage }) =>
    callApi(`/feedback`, { query: { establishment: establishmentId, page, perPage } });

export const getEstablishmentBarbers = (establishmentId) =>
    callApi(`/barbers`, { query: { establishment: establishmentId } });

export const createAppointment = (appointment) =>
    callApi('/appointments', { method: 'POST', data: appointment });
export const getEstablishmentAppointments = (establishmentId, { page, perPage } = {}) =>
    callApi('/appointments/establishment', {
        query: { establishment: establishmentId, page, perPage },
    });
export const getAppointment = (appointmentId) => callApi(`/appointments/${appointmentId}`);
export const getAppointments = () => callApi('/appointments');
export const cancelAppointment = ({ appointmentId, status}) => callApi(`/appointments/${appointmentId}`, { method: 'PATCH', data: { status } });

export const getServiceCategories = () => callApi('/service_categories');

