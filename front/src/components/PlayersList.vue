<template>
    <div class="mx-auto max-w-4xl rounded-lg bg-gray-100 p-4 text-black shadow-lg">
        <router-link
            to="/players/create"
            class="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-2xl text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
        >
            +
        </router-link>
        <h2 class="mb-4 text-xl font-bold">Liste des Joueurs</h2>
        <ul v-if="players && players.length" class="space-y-2">
            <li
                v-for="player in players"
                :key="player.id"
                class="flex items-center justify-between rounded-lg bg-white p-3 shadow-md"
            >
                <div class="flex items-center gap-4">
                    <div class="flex flex-col">
                        <span class="font-semibold">{{ player.name }} ({{ player.ranking }}) </span>
                    </div>
                </div>
                <button
                    @click="handleDelete(player.id)"
                    class="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white shadow-lg hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
                >
                    ✕
                </button>
            </li>
        </ul>
        <p v-else>Aucun joueur trouvé.</p>
    </div>
</template>

<script setup>
import { useGetPlayers, useDeletePlayer } from '@/composables/usePlayersQueries';

const { data: players } = useGetPlayers();
const { mutateAsync: deletePlayer } = useDeletePlayer();

const handleDelete = async (playerId) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce joueur ?')) {
        console.log(playerId);
        await deletePlayer(playerId);
    }
};
</script>
