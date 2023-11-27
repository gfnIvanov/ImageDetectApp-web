<script setup lang="ts">
// import { ref } from 'vue';

// defineProps();
// const emit = defineEmits(['']);
</script>

<template>
    <div class="fileblock">
        <RouterLink :to="{ name: 'ModelBlock' }">
            <div class="to-back button-border">Назад</div>
        </RouterLink>
        <input type="file" />
    </div>
</template>

<style scoped lang="scss"></style>
