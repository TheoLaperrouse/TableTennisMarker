<template>
    <div
        :class="[
            'menu flex flex-col justify-between bg-gray-800 text-white',
            isSidebarOpen ? 'min-w-[225px]' : 'min-w-[80px]',
        ]"
    >
        <ul class="ml-6 mt-4">
            <li class="py-4" v-for="(link, index) in menuLinks" :key="index">
                <RouterLink
                    :class="{ 'text-indigo-400': $route.path === link.to }"
                    :to="link.to"
                    class="flex items-center"
                >
                    <FontAwesomeIcon :icon="link.icon" class="mr-4 text-2xl" />
                    <span v-if="isSidebarOpen">{{ link.text }}</span>
                </RouterLink>
            </li>
        </ul>
        <a :href="githubLink" target="_blank" class="ml-6 flex items-center py-4">
            <FontAwesomeIcon :icon="faGithub" />
            <span class="ml-6" v-if="isSidebarOpen"> Repo Github </span>
        </a>
        <button
            v-if="!isPortrait"
            @click="toggleSidebar"
            :class="[
                'absolute bottom-4 rounded-full border border-gray-600 bg-gray-800 p-2 hover:bg-gray-700',
                isSidebarOpen ? 'left-[209px]' : 'left-[64px]',
            ]"
        >
            <FontAwesomeIcon :icon="isSidebarOpen ? faChevronLeft : faChevronRight" class="text-xl" />
        </button>
    </div>
</template>

<script setup>
import { useScreenSize } from '@/composables/useScreenSize';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
    faHome,
    faChevronLeft,
    faChevronRight,
    faTableTennisPaddleBall,
    faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useLocalStorage } from '@vueuse/core';
import { computed } from 'vue';

const { isPortrait } = useScreenSize();

const isSidebarOpen = useLocalStorage('isSidebarOpen', !isPortrait.value);
const toggleSidebar = () => (isSidebarOpen.value = !isSidebarOpen.value);

const menuLinks = computed(() => [
    { to: '/', text: 'Accueil', icon: faHome },
    { to: '/tables', text: 'Tables', icon: faTableTennisPaddleBall },
    { to: '/players', text: 'Joueurs', icon: faUsers },
]);

const githubLink = 'https://github.com/TheoLaperrouse/TableTennisMarker';
</script>
<style scoped>
.menu {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
}
</style>
