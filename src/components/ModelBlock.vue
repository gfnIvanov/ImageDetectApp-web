<script setup lang="ts">
import axios, { AxiosError } from 'axios';
import { onMounted, ref } from 'vue';
import type { ModelData } from '@/types';

const modelData = ref({} as unknown as ModelData);
const modelNotFound = ref(false);
const error = ref();

const getModelInfo = async function () {
    try {
        const res = await axios.get(import.meta.env.VITE_SERVER);
        if (res.status === 200) {
            modelNotFound.value = false;
            modelData.value.name = res.data.name;
            modelData.value.date = res.data.date;
            modelData.value.params = JSON.stringify(
                JSON.parse(res.data.params),
                null,
                4,
            );
            return;
        }
        throw new Error('Сервер вернул некорректный статус ответа');
    } catch (e: unknown) {
        if ((e as AxiosError).response?.status === 404) {
            modelNotFound.value = true;
            return;
        }
        error.value = e;
    }
};

const useModel = async function () {
    const res = await axios.put(import.meta.env.VITE_SERVER + '/use-model');
    if (res.status === 200) getModelInfo();
};

onMounted(() => {
    getModelInfo();
});
</script>

<template>
    <div class="modelblock">
        <div v-if="modelNotFound">
            <h1 style="margin-bottom: 20px">Модель отсутствует</h1>
            <div class="button-border" @click="useModel">
                Получить новую модель
            </div>
        </div>
        <div v-else>
            <h1>{{ modelData.name }}</h1>
            <div class="label ta-l">Дата обновления: {{ modelData.date }}</div>
            <div class="label ta-l">Параметры обучения:</div>
            <pre class="ta-l">{{ modelData.params }}</pre>
            <div style="display: flex">
                <RouterLink :to="{ name: 'FileBlock' }">
                    <div class="button-green">Использовать модель</div>
                </RouterLink>
                <div
                    class="button-border"
                    style="margin-left: 10px"
                    @click="useModel"
                >
                    Обновить модель
                </div>
            </div>
        </div>
        <span class="error">{{ error }}</span>
    </div>
</template>
