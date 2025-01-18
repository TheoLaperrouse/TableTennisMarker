<template>
    <div id="app" class="flex">
        <SideBar v-if="!isFullScreen" />
        <router-view class="flex-auto" :class="routerViewClass" />
    </div>
</template>

<script setup>
import SideBar from '@/components/SideBar.vue';
import { useLocalStorage } from '@vueuse/core';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isFullScreen = computed(() => route.name === 'ScoreBoardView');
const isSidebarOpen = useLocalStorage('isSidebarOpen', true);
const routerViewClass = computed(() => {
    if (isFullScreen.value) {
        return '';
    }
    return isSidebarOpen.value ? 'ml-[225px]' : 'ml-[80px]';
});
</script>
