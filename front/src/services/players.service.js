import { api, baseUrl } from '@/services/api.service.js';

const playersUrl = `${baseUrl}/players`;

/**
 * Get all players
 * @returns {Promise<Player[]>}
 */
export async function getPlayers() {
    return api.get(playersUrl);
}

/**
 * Create a table
 * @returns {Promise<Table>}
 */
export async function createPlayer(player) {
    return api.post(playersUrl, player);
}

/**
 * Get player from id
 * @param {string} id - The ID of the player to retrieve.
 * @returns {Promise<Player>}
 */
export async function getPlayer(id) {
    return api.get(`${playersUrl}/${id}`);
}

/**
 * Delete a player by ID
 * @param {string} id - The ID of the player to delete.
 * @returns {Promise<void>}
 */
export async function deletePlayer(id) {
    console.log(id);
    return api.delete(`${playersUrl}/${id}`);
}
