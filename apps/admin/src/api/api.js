import { callApi } from 'shared/src/api';

export const updateProviderRequest = (providerRequestId, providerRequest) =>
    callApi(`/provider_requests/${providerRequestId}`, {
        method: 'PUT',
        body: providerRequest,
    });

export const deleteProviderRequest = (providerRequestId) =>
    callApi(`/provider_requests/${providerRequestId}`, {
        method: 'DELETE',
    });

export const getProviderRequests = (query) => callApi('/provider_requests', { method: 'GET', query });    

export const getAdminIndicators = () =>
    callApi('/statistics/admin/indicators', {
        method: 'GET',
    });

export const getUsersTraffic = (query) =>
    callApi('/statistics/admin/userTraffic', { method: 'GET', query });
