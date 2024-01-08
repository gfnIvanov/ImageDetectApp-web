<script setup lang="ts">
import { ref, computed } from 'vue';
import { state, socket } from '@/socket';
import * as yup from 'yup';
import { Form, Field, ErrorMessage, GenericObject } from 'vee-validate';
import Modal from '@/components/Modal.vue';
import type { Params } from '@/types';

const showModal = ref(false);

const PARAMS: Params = {
    'test-size': 'Test size',
    'batch-size': 'Batch size',
    'img-shape': 'Image shape',
    'learn-rate': 'Learning rate',
    epochs: 'Epochs',
    optim: 'Optimizer',
};

const schema = yup.object({
    'test-size': yup.number().positive().min(0.1).max(0.5).required(),
    'batch-size': yup.number().positive().required(),
    'img-shape': yup.number().positive().min(32).required(),
    'learn-rate': yup.number().positive().max(0.1).required(),
    epochs: yup.number().positive().required(),
    optim: yup.string().required(),
});

const results = computed(() => {
    const actualRes = state.results.slice(-4);
    return actualRes.map(res => res[0].result);
});

const startTrain = function (values: GenericObject) {
    state.process = 'train';
    state.results = [];
    socket.emit('train-model', values);
};
</script>

<template>
    <div class="trainblock">
        <RouterLink :to="{ name: 'ModelBlock' }">
            <div class="to-back button-border">Назад</div>
        </RouterLink>
        <Form :validation-schema="schema" @submit="startTrain">
            <div v-for="key in Object.keys(PARAMS)" :key="key">
                <div class="row">
                    <div>
                        <label :for="key">{{
                            PARAMS[key as keyof Params]
                        }}</label>
                    </div>
                    <div v-if="key === 'optim'">
                        <div style="margin-right: 10px">
                            <Field name="optim" type="radio" value="SDG" />SDG
                        </div>
                        <div>
                            <Field name="optim" type="radio" value="Adam" />Adam
                        </div>
                    </div>
                    <div v-else>
                        <Field :id="key" :name="key" type="text" />
                    </div>
                </div>
                <div class="error"><ErrorMessage :name="key" /></div>
            </div>
            <div
                v-if="state.process === 'train' || state.process === 'check'"
                class="loader-block"
            >
                <div class="loader"></div>
            </div>
            <button v-else class="button-green" style="margin: 30px 0px">
                Начать обучение
            </button>
        </Form>
        <div style="height: 100px">
            <div v-if="state.process === 'train'">
                <div v-for="res in results" :key="res.iter" class="loss">
                    <div>epoch: {{ res.epoch }}</div>
                    <div>iter: {{ res.iter }}</div>
                    <div>loss: {{ res.loss }}</div>
                </div>
            </div>
            <div v-if="state.process === 'check'">Проверка модели...</div>
            <div v-if="state.process === 'done'">
                Обучение завершено
                <a @click="showModal = true"> (посмотреть отчёт)</a>
            </div>
        </div>
    </div>
    <Modal :show="showModal" @close="showModal = false" />
</template>

<style scoped>
input,
select {
    width: 140px;
    height: 30px;
}

input[type='radio'] {
    width: 15px;
    height: 15px;
}

input:focus {
    border-color: #4caf50;
    outline: 0;
    box-shadow: 0 0 0 0.5px #66a968;
}

.trainblock {
    padding-top: 60px;
}

.row {
    display: flex;
    margin: 10px;
    justify-content: center;
}
.row > div {
    width: 140px;
    align-items: center;
    display: flex;
}

.loader-block {
    display: flex;
    justify-content: center;
    margin: 30px 0px;
}

.loss {
    display: flex;
}

.loss div {
    width: 100px;
    text-align: left;
}
</style>
