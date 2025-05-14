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
 * Create a player
 * @returns {Promise<Table>}
 */
export async function createPlayer(player) {
    return api.post(playersUrl, player);
}

/**
 * Update a player
 * @returns {Promise<Player>}
 */
export async function updatePlayer({ id, ...player }) {
    return api.put(`${playersUrl}/${id}`, player);
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
export const getCurrentServer = (players) => {
    if (players.length !== 2) {
        return null;
    }
    const firstServer = players[0].first_server ? players[0] : players[1];
    const otherServer = players[0].first_server ? players[1] : players[0];
    const sets = players[0].sets + players[1].sets;
    const points = players[0].points + players[1].points;

    const isFirstPlayerServing =
        sets % 2 === 0
            ? points >= 20
                ? points % 2 === 0
                : Math.floor(points / 2) % 2 === 0
            : points >= 20
              ? points % 2 !== 0
              : Math.floor(points / 2) % 2 !== 0;
    return isFirstPlayerServing ? firstServer : otherServer;
};
