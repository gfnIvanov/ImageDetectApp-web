import ModelBlock from '@/components/ModelBlock.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'ModelBlock',
        component: ModelBlock,
    },
    {
        path: '/use-model',
        name: 'FileBlock',
        component: () => import('@/components/FileBlock.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/components/NotFound.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
