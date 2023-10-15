import { callApi } from './callApi';

/* Auth */
export const login = (credentials) => callApi('/login', { method: 'POST', data: credentials });
export const register = (user) => callApi('/users', { method: 'POST', data: user });

export const getUser = () => callApi('/users/me');
