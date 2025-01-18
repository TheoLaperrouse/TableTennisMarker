<template>
    <div class="flex min-h-screen items-center justify-center p-4">
        <div class="container mx-auto rounded-lg bg-white p-4 shadow-lg">
            <h1 class="mb-4 text-center text-2xl font-bold">Gérer les Scores en Direct</h1>
            <div v-for="player in players" :key="player.id" class="mb-4 rounded-lg border p-4 text-center shadow-lg">
                <h2 class="text-xl font-semibold">{{ player.name }}</h2>
                <div class="flex items-center justify-center space-x-4">
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
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { io } from 'socket.io-client';
import { useGetTable } from '@/composables/useTablesQueries';

const socket = io('http://localhost:3000');
const route = useRoute();
const tableId = route.params.id;
const { data: table } = useGetTable(tableId);
const players = ref([]);

const updateScore = (playerId, type, value) => {
    const player = players.value.find((p) => p.id === playerId);
    if (player) {
        player[type] += value;
        socket.emit('updateScore', { tableId, playerId, type, value });
    }
};

onMounted(() => {
    socket.emit('joinTable', tableId);

    watchEffect(() => {
        if (table.value) {
            players.value = table.value.players.map((player) => ({ ...player }));
        }
    });
});

onBeforeUnmount(() => {
    socket.emit('leaveTable', tableId);
});
</script>

<style scoped>
.container {
    max-width: 600px;
    margin: 0 auto;
}
</style>
