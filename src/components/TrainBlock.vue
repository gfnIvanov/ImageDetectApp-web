<script setup lang="ts">
import type { Params } from '@/types';

const PARAMS: Params = {
    'test-size': 'Test size',
    'batch-size': 'Batch size',
    'img-shape': 'Image shape',
    'learn-rate': 'Learning rate',
    epochs: 'Epochs',
    optim: 'Optimizer',
};
</script>

<template>
    <div class="trainblock">
        <RouterLink :to="{ name: 'ModelBlock' }">
            <div class="to-back button-border">Назад</div>
        </RouterLink>
        <form>
            <div v-for="key in Object.keys(PARAMS)" :key="key" class="row">
                <div>
                    <label :for="key">{{ PARAMS[key as keyof Params] }}</label>
                </div>
                <div v-if="key === 'optim'">
                    <div style="margin-right: 10px">
                        <input
                            name="optim"
                            type="radio"
                            value="SDG"
                            checked
                        />SDG
                    </div>
                    <div>
                        <input name="optim" type="radio" value="Adam" />Adam
                    </div>
                </div>
                <div v-else>
                    <input :id="key" type="text" />
                </div>
            </div>
        </form>
        <div class="button-green" style="margin: 30px 0px 10px">
            Начать обучение
        </div>
    </div>
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

.row {
    display: flex;
    margin: 10px;
}
.row > div {
    width: 140px;
    align-items: center;
    display: flex;
}
</style>
