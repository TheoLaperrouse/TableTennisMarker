import { api, baseUrl } from '@/services/api.service.js';

const tablesUrl = `${baseUrl}/tables`;

/**
 * Get all tables
 * @returns {Promise<Table[]>}
 */
export async function getTables() {
    return api.get(tablesUrl);
}

/**
 * Delete a table by ID
 * @param {string} id - The ID of the table to delete.
 * @returns {Promise<void>}
 */
export async function deleteTable(id) {
    return api.delete(`${tablesUrl}/${id}`);
}
