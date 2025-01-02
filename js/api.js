const API_BASE_URL = 'http://localhost:3001/api/repos';

const apiFetch = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
        return response.json();
    } catch (e) {
        console.error(`Erro API: ${e}`);
        throw error;
    }
};

export const getRepos = (offset, limit) => {
    return apiFetch(`?offset=${offset}&limit=${limit}`);
};

export const getRepoById = (id) => {
    return apiFetch(`/${id}`);
};

export const createRepo = (repoData) => {
    return apiFetch(`/create`, {
        method: 'POST',
        body: repoData,
    });
};

export const updateRepo = (id, repoData) => {
    return apiFetch(`/update/${id}`, {
        method: 'PUT',
        body: repoData,
    });
};

export const deleteRepo = (id) => {
    return apiFetch(`/delete/${id}`, {
        method: 'DELETE',
    });
};
