<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { socket } from '@/socket';
import type { ResponseModelInfo, ModelData } from '@/types';

const modelData = ref({} as unknown as ModelData);
const modelNotFound = ref(false);
const error = ref();

const getModelInfo = async function () {
    try {
        socket.emit('get-model-info', null, (res: ResponseModelInfo) => {
            if (res.status === 200) {
                modelNotFound.value = false;
                modelData.value.name = res.name;
                modelData.value.date = res.date;
                modelData.value.params = JSON.stringify(
                    JSON.parse(res.params),
                    null,
                    4,
                );
                return;
            }
            if (res.status === 404) {
                modelNotFound.value = true;
                throw new Error('Модель отсутствует');
            }
            throw new Error('Сервер вернул некорректный статус ответа');
        });
    } catch (e) {
        error.value = e;
    }
};

const updateModel = async function () {
    return;
};

onMounted(() => {
    getModelInfo();
});
</script>

<template>
    <div class="modelblock">
        <div v-if="modelNotFound">
            <h1 style="margin-bottom: 20px">{{ error }}</h1>
            <div class="button-border" @click="updateModel">
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
                <RouterLink :to="{ name: 'TrainBlock' }">
                    <div
                        class="button-border"
                        style="margin-left: 10px"
                        @click="updateModel"
                    >
                        Обновить модель
                    </div>
                </RouterLink>
            </div>
        </div>
        <span class="error">{{ error }}</span>
    </div>
</template>

<style scoped>
.modelblock {
    padding: 20px;
}
</style>
