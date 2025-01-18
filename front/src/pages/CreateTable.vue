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
            <div class="mb-4">
                <label class="mb-2 block font-medium">Joueur 1</label>
                <select
                    v-model="player1"
                    class="w-full rounded border px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                    required
                >
                    <option value="" disabled>Choisir un joueur</option>
                    <option v-for="player in players" :key="player.id" :value="player.id">
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
                    <option v-for="player in players" :key="player.id" :value="player.id">
                        {{ player.name }} ({{ player.ranking }})
                    </option>
                </select>
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
import { ref, computed } from 'vue';
import { useGetPlayers } from '@/composables/usePlayersQueries';
import { useCreateTable } from '@/composables/useTablesQueries';
import { useRouter } from 'vue-router';

const tableName = ref('');

const player1 = ref('');
const player2 = ref('');

const router = useRouter();

const { data: players } = useGetPlayers();
const { mutate: createTableMutation } = useCreateTable();
const selectedPlayers = computed(() => [player1.value, player2.value]);
const createTable = () => {
    createTableMutation({
        name: tableName.value,
        players: selectedPlayers.value.map((id) => ({
            id,
            sets: 0,
            points: 0,
        })),
    });

    router.push('/tables');
};

// const availablePlayers = computed(
//     () => players.value?.filter((player) => !selectedPlayers.value.includes(player.id)) || [],
// );
</script>
