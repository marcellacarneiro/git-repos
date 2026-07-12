const API_BASE_URL = 'http://localhost:3001/api';

const apiFetch = async (endpoint, options = {}) => {
    const token = sessionStorage.getItem('token');

    try {
        const headers = {
            ...options.headers,
            Authorization: token ? `Bearer ${token}` : '',
        };

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers,
        });

        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }

        return response.json();
    } catch (e) {
        console.error(`Erro API: ${e}`);
        throw e;
    }
};

export const getRepos = (offset, limit) => {
    return apiFetch(`/repos?offset=${offset}&limit=${limit}`);
};

export const getRepoById = (id) => {
    return apiFetch(`/repos/${id}`);
};

export const createRepo = (repoData) => {
    return apiFetch(`/repos/create`, {
        method: 'POST',
        body: repoData,
    });
};

export const updateRepo = (id, repoData) => {
    return apiFetch(`/repos/update/${id}`, {
        method: 'PUT',
        body: repoData,
    });
};

export const deleteRepo = (id) => {
    return apiFetch(`/repos/delete/${id}`, {
        method: 'DELETE',
    });
};

export const getUser = () => {
    return apiFetch(`/users/auth/me`);
}