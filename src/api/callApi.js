const BASE_URL = import.meta.env.VITE_API_URL;

export const callApi = async (
	url,
	{ method = "GET", data = null, headers = {} }
) => {
	const URL = BASE_URL + url;

	const options = {
		method,
		headers: {
			"Content-Type": "application/json",
			...headers,
			...authHeader(),
		},
	};

	if (data) {
		options.body = JSON.stringify(data);
	}

	const response = await fetch(URL, options);
	const responseData = await response.json();

	if (!response.ok) {
		throw new Error("Request failed");
	}

	return responseData;
};

const authHeader = () => {
	const token = localStorage.getItem("token");
	if (!token) return {};
	return { Authorization: "Bearer " + token };
};
