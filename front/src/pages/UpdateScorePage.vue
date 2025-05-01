<template>
    <div class="flex min-h-screen items-center justify-center p-4">
        <div class="container mx-auto rounded-lg bg-white p-4 shadow-lg">
            <h1 class="mb-4 text-center text-2xl font-bold">Gérer les Scores en Direct</h1>

            <div v-for="player in players" :key="player.id" class="mb-4 rounded-lg border p-4 text-center shadow-lg">
                <div class="flex items-center justify-between">
                    <h2 class="text-xl font-semibold">
                        {{ player.name }}
                    </h2>
                    <span
                        v-if="isServing(player.id)"
                        class="ml-2 inline-block h-4 w-4 rounded-full bg-blue-600"
                        title="Serveur actuel"
                    ></span>
                </div>
                <div class="flex justify-center space-x-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Sets</label>
                        <div class="flex items-center space-x-2">
                            <button
                                @click="updateScore(player.id, 'sets', -1)"
                                class="rounded bg-red-600 px-2 py-1 text-white"
                            >
                                -
                            </button>
                            <span>{{ player.sets }}</span>
                            <button
                                @click="updateScore(player.id, 'sets', 1)"
                                class="rounded bg-green-600 px-2 py-1 text-white"
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Points</label>
                        <div class="flex items-center space-x-2">
                            <button
                                @click="updateScore(player.id, 'points', -1)"
                                class="rounded bg-red-600 px-2 py-1 text-white"
                            >
                                -
                            </button>
                            <span>{{ player.points }}</span>
                            <button
                                @click="updateScore(player.id, 'points', 1)"
                                class="rounded bg-green-600 px-2 py-1 text-white"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="areScoresZero" class="mb-4 text-center">
                <label for="first-server" class="block text-sm font-medium text-gray-700"
                    >Choisir le premier serveur :</label
                >
                <select id="first-server" v-model="firstServer" class="mt-2 rounded border-gray-300 p-2">
                    <option v-for="player in players" :key="player.id" :value="player.id">
                        {{ player.name }}
                    </option>
                </select>
            </div>
            <button
                @click="resetPoints"
                class="mb-4 items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-white"
            >
                <span>Réinitialiser les points</span>
                <FontAwesomeIcon :icon="faRotate" class="ml-2" />
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watchEffect, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { io } from 'socket.io-client';
import { useGetTable } from '@/composables/useTablesQueries';
import { useUpdatePlayer } from '../composables/usePlayersQueries';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faRotate } from '@fortawesome/free-solid-svg-icons';

const socket = io('http://localhost:3000');
const route = useRoute();
const tableId = computed(() => route.params.id);
const { data: table } = useGetTable(tableId.value);
const { mutateAsync: updatePlayer } = useUpdatePlayer();
const players = ref([]);
const firstServer = ref(null);

const currentServer = computed(() => {
    if ((players.value ?? []).length === 0 || !firstServer.value) {
        return null;
    }
    const totalPoints = players.value.reduce((sum, player) => sum + player.points, 0);
    const firstServerIndex = players.value.findIndex((player) => player.id === firstServer.value);
    const currentIndex = (firstServerIndex + Math.floor(totalPoints / 2)) % players.value.length;
    return players.value[currentIndex].id;
});

const isServing = (playerId) => currentServer.value === playerId;

const areScoresZero = computed(() => players.value.every((player) => player.sets === 0 && player.points === 0));

const updateScore = async (playerId, type, value) => {
    const player = players.value.find((p) => p.id === playerId);
    if (player) {
        player[type] += value;
        await updatePlayer({ id: playerId, sets: player.sets, points: player.points });
        socket.emit('refreshScore', { tableId: tableId.value });
    }
};

const resetPoints = async () => {
    for (const player of players.value) {
        player.points = 0;
        await updatePlayer({ id: player.id, points: 0 });
    }
    socket.emit('refreshScore', { ableId: tableId.value });
};

watch(firstServer, async (newServer) => {
    if (newServer) {
        await updatePlayer({ id: newServer, firstServer: true, tableId: tableId.value });
    }
});

onMounted(() => {
    socket.emit('joinTable', tableId.value);
    watchEffect(() => {
        if (table.value) {
            players.value = table.value.players.map((player) => ({ ...player }));
        }
    });
});

onBeforeUnmount(() => {
    socket.emit('leaveTable', tableId.value);
});
</script>

<style scoped>
.container {
    max-width: 600px;
    margin: 0 auto;
}
</style>
