import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { deleteTable, getTable, getTables, createTable, updateTable } from '../services/tables.service';

export const useGetTables = () => {
    return useQuery({
        queryKey: ['tables'],
        queryFn: getTables,
    });
};

export const useGetTable = (tableId) => {
    return useQuery({
        queryKey: ['table', tableId],
        queryFn: () => getTable(tableId),
    });
};

export const useCreateTable = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createTable,
        onSuccess: () => queryClient.invalidateQueries(['tables']),
    });
};

export const useUpdateTable = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateTable,
        onSuccess: () => {
            queryClient.invalidateQueries(['tables']);
        },
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
