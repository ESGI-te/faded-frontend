import { callApi } from 'shared/src/api';

export const createBarber = (barberUser) =>
    callApi('/users/barber', { method: 'POST', data: barberUser });
export const updateBarber = (barberId, barber) =>
    callApi(`/barbers/${barberId}`, { method: 'PATCH', data: barber });
export const deleteBarber = (barberId) => callApi(`/barbers/${barberId}`, { method: 'DELETE' });

export const createProviderRequest = (formData) =>
    callApi('/provider_requests', { method: 'POST', data: formData });

export const createEstablishment = (establishment) =>
    callApi('/establishments', { method: 'POST', data: establishment });
export const updateEstablishment = ({ establishmentId, establishment }) =>
    callApi(`/establishments/${establishmentId}`, { method: 'PATCH', data: establishment });
