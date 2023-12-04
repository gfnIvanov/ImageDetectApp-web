<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import type { Classes } from '@/types';

const CLASSES: Classes = {
    cane: 'собака',
    cavallo: 'лошадь',
    elefante: 'слон',
    farfalla: 'бабочка',
    gallina: 'курица',
    gatto: 'кошка',
    mucca: 'корова',
    pecora: 'овца',
    scoiattolo: 'белка',
    ragno: 'паук',
};

const fileSelected = ref(false);
const classSelected = ref(false);
const inProcess = ref(false);
const imageURL = ref('');
const result = ref('');
const wrongResult = ref(true);
const error = ref();

const useModel = async function () {
    try {
        const useBtn = document.getElementById('use-btn');
        if (useBtn?.classList.contains('disabled')) return;
        inProcess.value = true;
        const select = document.getElementById('classes') as HTMLSelectElement;
        const fileBlock = document.getElementById(
            'file-block',
        ) as HTMLInputElement;
        const file = fileBlock.files![0];
        const formData = new FormData();
        formData.append('class', select.value);
        formData.append('file', file);
        const res = await axios.put(
            import.meta.env.VITE_SERVER + '/use-model',
            formData,
            {
                headers: { 'Content-Type': 'multipart/form-data' },
            },
        );
        if (res.status === 200) {
            wrongResult.value =
                CLASSES[select.value as keyof Classes] !== res.data;
            result.value = res.data;
            inProcess.value = false;
            return;
        }
        throw new Error('Сервер вернул некорректный статус ответа');
    } catch (e: unknown) {
        inProcess.value = false;
        error.value = e;
    }
};

const clearFile = function () {
    (document.getElementById('file-block') as HTMLInputElement).value = '';
    fileSelected.value = false;
    imageURL.value = '';
    result.value = '';
};

const changeClass = function () {
    const classesElem = document.getElementById('classes') as HTMLSelectElement;
    classSelected.value = classesElem.value !== '';
};

const selectFile = function () {
    const fileBlock = document.getElementById('file-block') as HTMLInputElement;
    const file = fileBlock.files![0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        imageURL.value = reader.result as string;
    };
    fileSelected.value = true;
};
</script>

<template>
    <div class="fileblock">
        <div class="file-selection">
            <RouterLink :to="{ name: 'ModelBlock' }">
                <div class="to-back button-border">Назад</div>
            </RouterLink>
            <input
                id="file-block"
                type="file"
                accept="image/*"
                @change="selectFile"
            />
            <div v-if="fileSelected" class="button pad-5" @click="clearFile">
                <img src="src/assets/clear.png" style="width: 30px" />
            </div>
        </div>
        <div>
            <img v-if="imageURL !== ''" class="select-image" :src="imageURL" />
            <div class="use-block">
                <select id="classes" @change="changeClass">
                    <option value=""></option>
                    <option
                        v-for="key in Object.keys(CLASSES)"
                        :key="key"
                        :value="key"
                    >
                        {{ CLASSES[key as keyof Classes] }}
                    </option>
                </select>
                <div v-if="inProcess" class="loader-block">
                    <div class="loader"></div>
                </div>
                <div
                    v-else
                    id="use-btn"
                    :class="[
                        { disabled: !classSelected || !fileSelected },
                        'button-green',
                    ]"
                    style="margin-left: 10px"
                    @click="useModel"
                >
                    Использовать
                </div>
            </div>
            <div v-if="result !== ''" class="result">
                Результат:
                <span :class="{ right: !wrongResult, wrong: wrongResult }">{{
                    result
                }}</span>
            </div>
            <span class="error">{{ error }}</span>
        </div>
    </div>
</template>

<style scoped>
.file-selection {
    padding: 20px;
    border: 1px solid darkgray;
}

.to-back {
    position: absolute;
    top: 20px;
    left: 20px;
}

.use-block {
    display: flex;
    margin: 10px 0px 10px;
    justify-content: center;
}

.select-image {
    width: 350px;
    height: 300px;
    margin-top: 10px;
}

.result {
    font-size: 24px;
}

.disabled {
    cursor: default;
    opacity: 0.5;
}

.right {
    color: #4caf50;
}

.wrong {
    color: red;
}

.loader-block {
    width: 170px;
    display: flex;
    justify-content: center;
    margin-left: 10px;
}

.loader {
    border: 5px solid #f3f3f3;
    border-top: 5px solid #3498db;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
