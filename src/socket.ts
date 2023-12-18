import { reactive } from 'vue';
import { io } from 'socket.io-client';

export const state = reactive({
    connected: false,
    trainEvents: [],
});

const URL = import.meta.env.VITE_SERVER;

export const socket = io(URL);

socket.on('connect', () => {
    state.connected = true;
});

socket.on('disconnect', () => {
    state.connected = false;
});
