export const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

/**
 * API wrapper with pre-defined methods
 */
export const api = {
    get: async (url) => apiRequest(url, 'GET'),
    post: async (url, body) => apiRequest(url, 'POST', body),
    put: async (url, body) => apiRequest(url, 'PUT', body),
    delete: async (url) => apiRequest(url, 'DELETE'),
};

/**
 * Core function for making HTTP requests
 * @param {string} url - The endpoint URL.
 * @param {string} method - The HTTP method (GET, POST, PUT, DELETE).
 * @param {Object} [body] - The request payload for POST/PUT methods.
 * @returns {Promise<any>} - The parsed response data.
 */
async function apiRequest(url, method, body = null) {
    try {
        const options = {
            method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(url, options);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData);
        }

        return method !== 'DELETE' ? await response.json() : null;
    } catch (error) {
        throw new Error(error.message || `Failed to ${method} data`);
    }
}
