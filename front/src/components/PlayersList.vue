<template>
    <div class="mx-auto max-w-4xl rounded-lg bg-gray-100 p-4 shadow-lg">
        <h2 class="mb-4 text-xl font-bold text-gray-800">Liste des Joueurs</h2>
        <ul v-if="players && players.length" class="space-y-2">
            <li
                v-for="player in players"
                :key="player.id"
                class="flex items-center justify-between rounded-lg bg-white p-3 shadow-md"
            >
                <div class="flex items-center gap-4">
                    <div class="flex flex-col">
                        <span class="font-semibold text-gray-700">{{ player.name }}</span>
                    </div>
                </div>
            </li>
        </ul>
        <p v-else class="text-gray-500">Aucun joueur trouvé.</p>
    </div>
</template>

<script setup>
import { useGetPlayers } from '@/composables/usePlayersQueries';

const { data: players } = useGetPlayers();
</script>
