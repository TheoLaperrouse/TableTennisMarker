<template>
    <div class="mx-auto max-w-4xl rounded-lg bg-gray-100 p-6 shadow-lg">
        <div class="mb-4">
            <label class="mb-2 block font-medium">Joueur 1</label>
            <select
                v-model="player1"
                class="w-full rounded border px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                required
            >
                <option value="" disabled>Choisir un joueur</option>
                <option v-for="player in availablePlayers" :key="player.id" :value="player.id">
                    {{ player.name }} ({{ player.ranking }})
                </option>
            </select>
        </div>
        <div class="mb-4">
            <label class="mb-2 block font-medium">Joueur 2</label>
            <select
                v-model="player2"
                class="w-full rounded border px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                required
            >
                <option value="" disabled>Choisir un joueur</option>
                <option v-for="player in availablePlayers" :key="player.id" :value="player.id">
                    {{ player.name }} ({{ player.ranking }})
                </option>
            </select>
        </div>
        <div class="mt-6 flex justify-end">
            <button
                @click="handleSubmit"
                class="w-full rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
            >
                Enregistrer les modifications
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUpdateTable } from '@/composables/useTablesQueries';
import { useGetPlayers } from '@/composables/usePlayersQueries';

const route = useRoute();
const router = useRouter();

const tableId = parseInt(route.params.id, 10);

const player1 = ref('');
const player2 = ref('');

const { data: availablePlayers } = useGetPlayers();

const { mutate: updateTable } = useUpdateTable();

const handleSubmit = () => {
    updateTable({ id: tableId, players: [player1.value, player2.value] });
    router.push('/tables');
};
</script>
