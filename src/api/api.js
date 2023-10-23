import { callApi } from './callApi';

/* Auth */
export const login = (credentials) => callApi('/login', { method: 'POST', data: credentials });
export const register = (user) => callApi('/users', { method: 'POST', data: user });
export const getUser = () => callApi('/users/me');

export const getEstablishmentSuggestions = ({ page, itemsPerPage, name }) =>
    callApi('/establishments', {
        query: { name, page, itemsPerPage },
    });
export const getEstablishments = ({ page, itemsPerPage, ...q }) => {
    callApi('/establishments/search', {
        query: { ...q, page, itemsPerPage },
    });
};
export const getServiceCategories = () => callApi('/service_categories');
