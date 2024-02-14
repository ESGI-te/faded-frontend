import camelcaseKeys from "camelcase-keys";

const BASE_URL = import.meta.env.VITE_API_URL;
let isRefreshing = false;

export const callApi = async (url, options) => {
	let URL = BASE_URL + url;

	if (options?.query) {
		const queryParams = new URLSearchParams();
		Object.entries(options.query).forEach(([key, value]) => {
			if (value === undefined || value === null) return;
			queryParams.append(key, value);
		});
		// const pageParam = queryParams.get("page");
		// const pagination = queryParams.get("pagination");
		// pagination ?? queryParams.append("pagination", !!pageParam);
		const queryString = queryParams.toString();
		URL = `${URL}?${queryString}`;
	}

	const fetchOptions = {
		method: options?.method || "GET",
		headers: {
			"Content-Type": "application/json",
			...authHeader(),
			...options?.headers,
		},
	};

	if (options?.data) {
		fetchOptions.body = JSON.stringify(options.data);
	}

	const response = await fetch(URL, fetchOptions);

	if (!response.ok) {
		const refreshTokenValue = localStorage.getItem("refreshToken");

		if (!isRefreshing && response.status === 401 && refreshTokenValue) {
			return refreshToken(refreshTokenValue);
		}

		throw new Error("Network request failed");
	}

	let responseData;
	try {
		responseData = await response.json();
	} catch (error) {
		responseData = null;
	}

	return transformResponse(responseData);
};

const authHeader = () => {
	if (isRefreshing) return {};
	const token = localStorage.getItem("accessToken");
	if (!token) return {};
	return { Authorization: "Bearer " + token };
};

const transformResponse = (response) => {
	return camelcaseKeys(response, { deep: true });
};

const refreshToken = async (refreshToken) => {
	if (!refreshToken) {
		return;
	}

	isRefreshing = true;
	try {
		const response = await callApi("/token/refresh", {
			method: "POST",
			data: { refresh_token: refreshToken },
			headers: {},
		});
		localStorage.setItem("accessToken", response.token);
		localStorage.setItem("refreshToken", response.refreshToken);
		isRefreshing = false;
	} catch (error) {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
		isRefreshing = false;
		window.location.href = "/login";
		throw error;
	}
};
