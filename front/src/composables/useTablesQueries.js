import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { deleteTable, getTables, createTable } from '../services/tables.service';

export const useGetTables = () => {
    return useQuery({
        queryKey: ['tables'],
        queryFn: getTables,
    });
};

export const useCreateTable = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createTable,
        onSuccess: () => queryClient.invalidateQueries(['tables']),
    });
};

export const useDeleteTable = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteTable,
        onSuccess: () => {
            queryClient.invalidateQueries(['tables']);
        },
    });
};
