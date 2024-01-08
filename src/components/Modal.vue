<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { state } from '@/socket';

const props = defineProps<{ show: boolean }>();

const results = computed(() => {
    let resStr = '';
    state.results.forEach(res => {
        const actual = res[0];
        resStr += JSON.stringify(actual.result, null, 4) + '\n';
    });
    return resStr;
});
</script>

<template>
    <div v-if="props.show" class="modal">
        <div class="modal-container">
            <div class="btn-block">
                <img
                    :src="`src/assets/clear.png`"
                    width="20px"
                    @click="$emit('close')"
                />
            </div>
            <pre>{{ results }}</pre>
        </div>
    </div>
</template>

<style scoped>
.modal {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    transition: opacity 0.3s ease;
}
.modal-container {
    width: 500px;
    height: 300px;
    margin: auto;
    padding: 15px;
    overflow: auto;
    text-align: left;
    background-color: #242424;
    border: 3px solid darkgray;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
    transition: all 0.3s ease;
}

.btn-block {
    display: flex;
    justify-content: end;
}

img {
    position: fixed;
    cursor: pointer;
}
</style>
