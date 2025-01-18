<template>
    <div class="container mx-auto p-4">
        <h1 class="mb-4 text-2xl font-bold">Créer une Équipe</h1>
        <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
                <label for="name" class="block text-sm font-medium text-gray-700">Nom de l'équipe</label>
                <input
                    type="text"
                    id="name"
                    v-model="name"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                    required
                />
            </div>
            <button
                type="submit"
                class="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
            >
                Créer
            </button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCreateTeam } from '@/composables/useTeamQueries';

const name = ref('');
const router = useRouter();
const { mutateAsync: createTeam } = useCreateTeam();

const handleSubmit = async () => {
    await createTeam({ name: name.value });
    router.push('/teams');
};
</script>
