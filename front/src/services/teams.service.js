import { api, baseUrl } from '@/services/api.service.js';

const teamsUrl = `${baseUrl}/teams`;

export const getTeams = async () => {
    return api.get(teamsUrl);
};

export const createTeam = async (newTeam) => {
    return api.post(teamsUrl, newTeam);
};

export const deleteTeam = async (teamId) => {
    await api.delete(`${teamsUrl}/${teamId}`);
};
