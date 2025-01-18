<template>
    <div class="container mx-auto p-4">
        <router-link
            to="/tables/create"
            class="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xl text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
        >
            <FontAwesomeIcon :icon="faPlus" class="text-sm" />
        </router-link>
        <div
            v-for="table in tables"
            :key="table.id"
            class="relative mb-6 cursor-pointer rounded-lg border p-4 shadow-lg"
        >
            <div class="absolute right-4 top-4 flex space-x-2">
                <router-link
                    :to="`/tables/edit/${table.id}`"
                    class="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-lg text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                >
                    <FontAwesomeIcon :icon="faPen" class="text-sm" />
                </router-link>
                <button
                    @click="handleDelete(table.id)"
                    class="flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-lg text-white shadow-lg hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
                >
                    <FontAwesomeIcon :icon="faTrash" class="text-sm" />
                </button>
            </div>
            <router-link :to="`/tables/${table.id}`" class="mb-2 block text-xl font-bold text-gray-800">
                {{ table.name }}
            </router-link>
            <ScoreBoard :table="table" />
        </div>
    </div>
</template>

<script setup>
import { useGetTables, useDeleteTable } from '@/composables/useTablesQueries';
import ScoreBoard from '@/components/ScoreBoard.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPen, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

const { data: tables } = useGetTables();
const { mutateAsync: deleteTable } = useDeleteTable();

const handleDelete = async (tableId) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette table ?')) {
        await deleteTable(tableId);
    }
};
</script>
