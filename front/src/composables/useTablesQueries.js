import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { deleteTable, getTables } from '../services/tables.service';

/**
 * Returns a composable to fetch tables.
 *
 * @usage
 * ```
 * const { isPending, data: tables } = useGetTables();
 * ```
 */
export const useGetTables = () => {
    return useQuery({
        queryKey: ['tables'],
        queryFn: getTables,
    });
};

/**
 * Returns a composable to delete a table.
 *
 * @returns Composable
 *
 * @usage
 * ```
 * const { mutate: deleteTable } = useDeleteTable();
 * ```
 */
export const useDeleteTable = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteTable,
        onSuccess: () => {
            queryClient.invalidateQueries(['tables']);
        },
    });
};
