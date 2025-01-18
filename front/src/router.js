import { createWebHistory, createRouter } from 'vue-router';
import TablesPage from '@/pages/TablesPage.vue';
import ScoreBoardView from '@/pages/ScoreBoardView.vue';
import PlayersPage from '@/pages/PlayersPage.vue';
import HomePage from './pages/HomePage.vue';

const routes = [
    { path: '/', component: HomePage },
    { path: '/tables', component: TablesPage },
    { path: '/players', component: PlayersPage },
    {
        path: '/tables/:id',
        name: 'ScoreBoardView',
        component: ScoreBoardView,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
