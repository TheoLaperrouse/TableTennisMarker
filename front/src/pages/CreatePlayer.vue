<template>
    <div class="container mx-auto max-w-lg rounded bg-white p-6 shadow-md">
        <h1 class="mb-4 text-2xl font-bold">Créer un nouveau joueur</h1>
        <form @submit.prevent="createPlayer">
            <div class="mb-4">
                <label for="playerName" class="mb-2 block font-medium">Nom du Joueur (ex : DUPONT Jean)</label>
                <input
                    id="playerName"
                    v-model="playerName"
                    type="text"
                    placeholder="Nom du joueur"
                    class="w-full rounded border px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                    required
                />
            </div>
            <div class="mb-4">
                <label for="ranking" class="mb-2 block font-medium">Classement du Joueur (ex : 2232)</label>
                <input
                    id="ranking"
                    v-model="ranking"
                    type="text"
                    placeholder="Classement"
                    class="w-full rounded border px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                    required
                />
            </div>
            <button
                type="submit"
                class="w-full rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
            >
                Créer le joueur
            </button>
        </form>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useCreatePlayer } from '@/composables/usePlayersQueries';

const playerName = ref('');
const ranking = ref('');

const router = useRouter();

const { mutate: createPlayerMutation } = useCreatePlayer();
const createPlayer = () => {
    createPlayerMutation({ name: playerName.value, ranking: ranking.value });
    router.push('/players');
};
</script>
