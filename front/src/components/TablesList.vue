<template>
    <div class="container mx-auto p-4">
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
