import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { deletePlayer, getPlayers } from '@/services/players.service';

/**
 * Returns a composable to fetch players.
 *
 * @usage
 * ```
 * const { isPending, data: players } = useGetPlayers();
 * ```
 */
export const useGetPlayers = () => {
    return useQuery({
        queryKey: ['players'],
        queryFn: getPlayers,
    });
};

/**
 * Returns a composable to delete a player.
 *
 * @returns Composable
 *
 * @usage
 * ```
 * const { mutate: deletePlayer } = useDeletePlayer();
 * ```
 */
export const useDeletePlayer = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deletePlayer,
        onSuccess: () => {
            queryClient.invalidateQueries(['players']);
        },
    });
};
