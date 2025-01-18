<template>
    <div class="container mx-auto p-4">
        <router-link
            to="/tables/create"
            class="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-2xl text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
        >
            +
        </router-link>
        <div v-for="table in tables" :key="table.id" class="mb-6 cursor-pointer">
            <router-link :to="`/tables/${table.id}`" class="mb-2 block text-xl font-bold text-gray-800">
                {{ table.name }}
            </router-link>
            <ScoreBoard :table="table" />
        </div>
    </div>
</template>

<script setup>
import { useGetTables } from '@/composables/useTablesQueries';
import ScoreBoard from '@/components/ScoreBoard.vue';

const { data: tables } = useGetTables();
</script>
