<template>
    <div class="container mx-auto max-w-lg rounded bg-white p-6 shadow-md">
        <h1 class="mb-4 text-2xl font-bold">Créer une Nouvelle Table</h1>
        <form @submit.prevent="createTable">
            <div class="mb-4">
                <label for="tableName" class="mb-2 block font-medium">Nom de la Table</label>
                <input
                    id="tableName"
                    v-model="tableName"
                    type="text"
                    placeholder="Nom de la table"
                    class="w-full rounded border px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                    required
                />
            </div>
            <button
                type="submit"
                class="w-full rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
            >
                Créer la Table
            </button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useCreateTable } from '@/composables/useTablesQueries';
import { useRouter } from 'vue-router';

const router = useRouter();
const tableName = ref('');

const { mutate: createTableMutation } = useCreateTable();
const createTable = () => {
    createTableMutation({
        name: tableName.value,
    });

    router.push('/tables');
};
</script>
