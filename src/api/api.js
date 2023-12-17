import { callApi } from './callApi';

/* Auth */
export const login = (credentials) => callApi('/login', { method: 'POST', data: credentials });
export const register = (user) => callApi('/users', { method: 'POST', data: user });
export const getUser = () => callApi('/auth/user');

/* Users */
export const updateUser = (userId, user) =>
    callApi(`/users/${userId}`, { method: 'PATCH', data: user });

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
export const getBarbers = ({ page, perPage, ...q } = {}) =>
    callApi('/barbers', { query: { ...q, page, perPage } });

export const createAppointment = (appointment) =>
    callApi('/appointments', { method: 'POST', data: appointment });
export const getEstablishmentAppointments = (establishmentId, { page, perPage } = {}) =>
    callApi('/appointments/establishment', {
        query: { establishment: establishmentId, page, perPage },
    });
export const getAppointment = (appointmentId) => callApi(`/appointments/${appointmentId}`);
export const getAppointments = () => callApi('/appointments');
export const cancelAppointment = (appointmentId, appointment) =>
    callApi(`/appointments/${appointmentId}/cancel`, { method: 'PATCH', data: appointment });

export const getServiceCategories = () => callApi('/service_categories');

/* Barber */
export const createBarber = (barberUser) =>
    callApi('/users/barber', { method: 'POST', data: barberUser });
export const updateBarber = (barberId, barber) =>
    callApi(`/barbers/${barberId}`, { method: 'PATCH', data: barber });
export const deleteBarber = (barberId) => callApi(`/barbers/${barberId}`, { method: 'DELETE' });

/* Provider */
export const createProvider = (formData) =>
    callApi('/users/provider', { method: 'POST', data: formData });

export const createProviderRequest = (formData) =>
    callApi('/provider_requests', { method: 'POST', data: formData });
export const getProviderRequests = ({ token, page, perPage }) =>
    callApi(`/provider_requests/`, { query: { token, page, perPage } });
