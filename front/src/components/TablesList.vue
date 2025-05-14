<template>
    <div class="container mx-auto p-4">
        <router-link
            to="/tables/create"
            class="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-lg text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
        >
            <FontAwesomeIcon :icon="faPlus" class="text-sm" />
        </router-link>
        <!-- Grille pour les cartes -->
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
            <div
                v-for="table in tables"
                :key="table.id"
                class="relative mx-auto w-full max-w-lg cursor-pointer rounded-lg border bg-white p-6 shadow-lg"
            >
                <div class="absolute right-4 top-4 flex space-x-2">
                    <router-link
                        :to="`/tables/edit/${table.id}`"
                        class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        <FontAwesomeIcon :icon="faPen" class="text-xs" />
                    </router-link>
                    <router-link
                        :to="`/tables/${table.id}/score`"
                        class="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-sm text-white shadow-lg hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"
                    >
                        <FontAwesomeIcon :icon="faGamepad" class="text-xs" />
                    </router-link>
                    <button
                        @click="handleDelete(table.id)"
                        class="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-sm text-white shadow-lg hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
                    >
                        <FontAwesomeIcon :icon="faTrash" class="text-xs" />
                    </button>
                </div>
                <router-link :to="`/tables/${table.id}`" class="mb-4 block text-2xl font-bold text-gray-800">
                    {{ table.name }}
                </router-link>
                <router-link :to="`/tables/${table.id}`" class="block">
                    <ScoreBoard :table="table" />
                </router-link>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useGetTables, useDeleteTable } from '@/composables/useTablesQueries';
import ScoreBoard from '@/components/ScoreBoard.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPen, faTrash, faPlus, faGamepad } from '@fortawesome/free-solid-svg-icons';
import { onMounted, onBeforeUnmount } from 'vue';
import { socket } from '../services/socket.service';

const { data: tables, refetch } = useGetTables();
const { mutateAsync: deleteTable } = useDeleteTable();

const handleDelete = async (tableId) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette table ?')) {
        await deleteTable(tableId);
    }
};

onMounted(() => {
    tables.value?.forEach(({ id }) => {
        socket.emit('joinTable', id);
    });
    socket.on('refreshScore', () => {
        refetch();
        console.log(tables.value);
    });
});

onBeforeUnmount(() => {
    tables.value.forEach(({ id }) => {
        socket.emit('leaveTable', id);
    });
});
</script>
