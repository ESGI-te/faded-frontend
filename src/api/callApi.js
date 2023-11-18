import camelcaseKeys from 'camelcase-keys';

const BASE_URL = import.meta.env.VITE_API_URL;

export const callApi = async (url, options) => {
    let URL = BASE_URL + url;

    if (options?.query) {
        const queryParams = new URLSearchParams();
        Object.entries(options.query).forEach(([key, value]) => {
            if (!value) return;
            queryParams.append(key, value);
        });
        const pageParam = queryParams.get('page');

        queryParams.append('pagination', !!pageParam);

        const queryString = queryParams.toString();
        URL = `${URL}?${queryString}`;
    }

    const fetchOptions = {
        method: options?.method || 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
            ...authHeader(),
        },
    };

    if (options?.data) {
        fetchOptions.body = JSON.stringify(options.data);
    }

    const response = await fetch(URL, fetchOptions);
    const responseData = await response.json();

    if (!response.ok) {
        if (response.status === 401) {
            // auto logout if 401 response returned from api
            localStorage.removeItem('token');
            location.reload();
        }
    }

    return transformResponse(responseData);
};

const authHeader = () => {
    const token = localStorage.getItem('token');
    if (!token) return {};
    return { Authorization: 'Bearer ' + token };
};

const transformResponse = (response) => {
    return camelcaseKeys(response, { deep: true });
};
