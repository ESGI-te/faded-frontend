import { callApi } from 'shared/src/api';

export const createBarber = (barber) => callApi('/barbers', { method: 'POST', data: barber });
export const updateBarber = (barberId, barber) =>
    callApi(`/barbers/${barberId}`, { method: 'PATCH', data: barber });
export const deleteBarber = (barberId) => callApi(`/barbers/${barberId}`, { method: 'DELETE' });

export const createProviderRequest = (formData) =>
    callApi('/provider_requests', { method: 'POST', data: formData });

export const createEstablishment = (establishment) =>
    callApi('/establishments', { method: 'POST', data: establishment });
export const updateEstablishment = ({ establishmentId, establishment }) =>
    callApi(`/establishments/${establishmentId}`, { method: 'PATCH', data: establishment });
export const updateEstablishmentStatus = ({ establishmentId, status }) =>
    callApi(`/establishments/${establishmentId}/status`, {
        method: 'PATCH',
        data: {
            status,
        },
    });

export const createService = (service) => callApi('/services', { method: 'POST', data: service });
export const updateService = (serviceId, service) =>
    callApi(`/services/${serviceId}`, { method: 'PATCH', data: service });

export const getProvider = (providerId) => callApi(`/providers/${providerId}`);
export const updateProvider = (providerId, provider) =>
    callApi(`/providers/${providerId}`, { method: 'PATCH', data: provider });
export const updateProviderImage = (providerId, image) =>
    callApi(`/providers/${providerId}/image`, {
        method: 'PATCH',
        data: image,
    });

export const updateEstablishmentImage = (establishmentId, image) =>
    callApi(`/establishments/${establishmentId}/image`, {
        method: 'PATCH',
        data: image,
    });

/* Statistics */
export const getAppointmentRate = (query) =>
    callApi('/statistics/appointments/rate', { method: 'GET', query });
export const getDailyIndicators = (establishmentId) =>
    callApi('/statistics/daily', {
        method: 'GET',
        query: {
            establishmentId,
        },
    });
export const getGlobalIndicators = (establishmentId) =>
    callApi('/statistics/global', {
        method: 'GET',
        query: {
            establishmentId,
        },
    });
export const getTopServices = ({ establishmentId, limit }) =>
    callApi('/statistics/services/top', {
        method: 'GET',
        query: {
            establishmentId,
            limit,
        },
    });
