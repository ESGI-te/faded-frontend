import { callApi } from ".";

/* Auth */
export const login = (credentials) =>
	callApi("/login", { method: "POST", data: credentials });
export const register = (user) =>
	callApi("/users", { method: "POST", data: user });
export const getUser = () => callApi("/auth/user");
export const resetPassword = (email) =>
	callApi("/reset_password", { method: "POST", data: email });

/* Users */
export const updateUser = (userId, user) =>
	callApi(`/users/${userId}`, { method: "PATCH", data: user });
export const updateUserPassword = (userId, data) =>
	callApi(`/users/${userId}/password`, { method: "PATCH", data });
export const getResetPasswordTokens = (token) =>
	callApi(`/reset_password_tokens?token=${token}`);

export const getEstablishments = ({ page, perPage, ...q }) =>
	callApi("/establishments", {
		query: { ...q, page, perPage },
	});
export const getEstablishment = (establishmentId) =>
	callApi(`/establishments/${establishmentId}`);
export const getServices = (query) => callApi(`/services`, query);
export const getEstablishmentSuggestions = ({ page, perPage, name }) =>
	callApi("/establishments/suggestions", {
		query: { name, page, perPage },
	});
export const getEstablishmentImages = (establishmentId, query) =>
	callApi(`/establishments/${establishmentId}/images`, query);

export const getAllFeedback = (establishmentId, { page, perPage }) =>
	callApi(`/feedback`, {
		query: { establishment: establishmentId, page, perPage },
	});

export const getBarbers = ({ page, perPage, ...q } = {}) =>
	callApi("/barbers", { query: { ...q, page, perPage } });

export const getAppointments = (query) =>
	callApi("/appointments", {
		query,
	});
export const cancelAppointment = (appointmentId, appointment) =>
	callApi(`/appointments/${appointmentId}/cancel`, {
		method: "PATCH",
		data: appointment,
	});
export const updateAppointment = ({ appointmentId, appointment }, query) =>
	callApi(`/appointments/${appointmentId}/complete`, {
		method: "PATCH",
		data: appointment,
		query,
	});

export const getServiceCategories = () => callApi("/service_categories");
