<template>
    <div
        class="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-blue-800 p-8 text-white"
    >
        <h1 class="mb-8 text-5xl font-extrabold">{{ tableData?.name }}</h1>
        <div class="w-full max-w-6xl rounded-lg bg-blue-900 p-8 shadow-2xl">
            <div class="flex flex-col gap-6">
                <div
                    v-for="(player, index) in tableData?.players"
                    :key="index"
                    class="flex items-center justify-between rounded-lg bg-black/50 px-8 py-6"
                >
                    <div class="flex items-center gap-6">
                        <span class="text-4xl font-extrabold">{{ player.name }}</span>
                    </div>
                    <div class="flex items-center gap-8">
                        <span
                            v-if="player.id === server.id"
                            class="ml-4 inline-block h-4 w-4 rounded-full bg-white"
                            title="Serveur actuel"
                        ></span>
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
import { computed, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import { useGetTable } from '@/composables/useTablesQueries';
import { getCurrentServer } from '../services/players.service';
import { socket } from '../services/socket.service';

const route = useRoute();
const tableId = parseInt(route.params.id);
const { data: tableData, refetch } = useGetTable(tableId);
const server = computed(() => getCurrentServer(tableData.value.players));

onMounted(() => {
    socket.emit('joinTable', tableId);
    socket.on('refreshScore', () => {
        refetch();
    });
});

onBeforeUnmount(() => {
    socket.emit('leaveTable', tableId);
});
</script>
