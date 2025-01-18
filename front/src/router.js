import { createWebHistory, createRouter } from 'vue-router';
import TablesPage from '@/pages/TablesPage.vue';
import ScoreBoardView from '@/pages/ScoreBoardView.vue';
import PlayersPage from '@/pages/PlayersPage.vue';
import HomePage from '@/pages/HomePage.vue';
import CreateTable from '@/pages/CreateTable.vue';
import CreatePlayer from '@/pages/CreatePlayer.vue';
import UpdateTable from '@/pages/UpdateTable.vue';

const routes = [
    { path: '/', component: HomePage },
    { path: '/tables', component: TablesPage },
    { path: '/tables/create', name: 'CreateTable', component: CreateTable },
    { path: '/tables/edit/:id', name: 'UpdateTable', component: UpdateTable },
    { path: '/tables/:id', name: 'ScoreBoardView', component: ScoreBoardView },
    { path: '/players', component: PlayersPage },
    { path: '/players/create', name: 'CreatePlayer', component: CreatePlayer },
];

const router = createRouter({ history: createWebHistory(), routes });

export default router;
