import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { getTeams, createTeam, deleteTeam } from '../services/teams.service';

export const useGetTeams = () => {
    return useQuery({
        queryKey: ['teams'],
        queryFn: getTeams,
    });
};

export const useCreateTeam = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createTeam,
        onSuccess: () => queryClient.invalidateQueries(['teams']),
    });
};

export const useDeleteTeam = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteTeam,
        onSuccess: () => {
            queryClient.invalidateQueries(['teams']);
        },
    });
};
