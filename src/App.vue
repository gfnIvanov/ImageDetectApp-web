<script setup lang="ts">
import { computed } from 'vue';
import { state } from '@/socket';

const error = computed(() => {
    return state.connected ? '' : 'Подключение к серверу не выполнено';
});
</script>
<template>
    <RouterView />
    <span class="error">{{ error }}</span>
</template>
