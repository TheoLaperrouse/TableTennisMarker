<template>
    <div
        class="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-blue-800 p-8 text-white"
    >
        <h1 class="mb-8 text-5xl font-extrabold">{{ table.name }}</h1>
        <div class="w-full max-w-6xl rounded-lg bg-blue-900 p-8 shadow-2xl">
            <div class="flex flex-col gap-6">
                <div
                    v-for="(player, index) in table.players"
                    :key="index"
                    class="flex items-center justify-between rounded-lg bg-black/50 px-8 py-6"
                >
                    <div class="flex items-center gap-6">
                        <span class="text-4xl font-extrabold">{{ player.name }}</span>
                    </div>
                    <div class="flex items-center gap-8">
                        <div
                            class="flex h-12 w-12 items-center justify-center rounded-full bg-blue-700 text-center text-3xl font-bold"
                        >
                            {{ player.sets }}
                        </div>
                        <span class="text-5xl font-extrabold">{{ player.points }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import { io } from 'socket.io-client';
import { useGetTable } from '@/composables/useTablesQueries';

const socket = io('http://localhost:3000');
const route = useRoute();
const tableId = parseInt(route.params.id);
const { data: tableData, refetch } = useGetTable(tableId);
const table = ref({});

onMounted(() => {
    socket.emit('joinTable', tableId);

    if (tableData.value) {
        table.value = { ...tableData.value, players: tableData.value.players.map((player) => ({ ...player })) };
    }

    socket.on('refreshScore', () => {
        refetch();
    });
});

onBeforeUnmount(() => {
    socket.emit('leaveTable', tableId);
});
</script>
