import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { deletePlayer, getPlayers, createPlayer } from '@/services/players.service';

export const useGetPlayers = () => useQuery({ queryKey: ['players'], queryFn: getPlayers });

export const useCreatePlayer = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createPlayer,
        onSuccess: () => {
            queryClient.invalidateQueries(['players']);
        },
    });
};

export const useDeletePlayer = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deletePlayer,
        onSuccess: () => {
            queryClient.invalidateQueries(['players']);
        },
    });
};
