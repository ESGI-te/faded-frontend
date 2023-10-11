import { callApi } from "./callApi";

/* Auth */
export const login = (credentials) =>
	callApi("/auth/login", { method: "POST", data: credentials });
export const register = (user) =>
	callApi("/users", { method: "POST", data: user });
