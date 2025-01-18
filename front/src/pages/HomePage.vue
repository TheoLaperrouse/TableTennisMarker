<template>
    <div class="flex min-h-screen items-center justify-center">
        <div class="rounded-lg text-center">
            <h1 class="mb-6 text-4xl font-bold">Gestion centralisé marqueurs</h1>
            <p class="mb-6 text-lg">Interface administrateur</p>
            <router-link
                :to="`/tables`"
                class="mr-2 mt-4 rounded-lg bg-blue-500 px-6 py-3 text-white hover:bg-blue-600"
            >
                Voir les tables
            </router-link>
            <router-link
                :to="`/players`"
                class="ml-2 mt-4 rounded-lg bg-blue-500 px-6 py-3 text-white hover:bg-blue-600"
            >
                Voir les joueurs
            </router-link>
        </div>
    </div>
</template>
