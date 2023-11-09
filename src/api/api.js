import { callApi } from './callApi';

/* Auth */
export const login = (credentials) => callApi('/login', { method: 'POST', data: credentials });
export const register = (user) => callApi('/users', { method: 'POST', data: user });
export const getUser = () => callApi('/users/me');

export const getEstablishments = ({ page, itemsPerPage, ...q }) =>
    callApi('/establishments/search', {
        query: { ...q, page, itemsPerPage },
    });
export const getEstablishment = (establishmentId) => callApi(`/establishments/${establishmentId}`);
export const getEstablishmentServices = (establishmentId, query) =>
    callApi(`/services/establishment/${establishmentId}`, query);
export const getEstablishmentSuggestions = ({ page, itemsPerPage, name }) =>
    callApi('/establishments', {
        query: { name, page, itemsPerPage },
    });
export const getEstablishmentFeedback = (establishmentId, query) =>
    callApi(`/feedback/establishment/${establishmentId}`, query);
export const getEstablishmentOpeningHours = (establishmentId, query) =>
    callApi(`/opening_hours/establishment/${establishmentId}`, query);
export const getEstablishmentBarbers = (establishmentId, query) =>
    callApi(`/barbers/establishment/${establishmentId}`, query);
export const getEstablishmentImages = (establishmentId, query) =>
    callApi(`/images/establishment/${establishmentId}`, query);
export const getServiceCategories = () => callApi('/service_categories');
