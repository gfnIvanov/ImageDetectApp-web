import { reactive } from 'vue';
import { io } from 'socket.io-client';
import type { SocketState, TrainResults } from './types';

export const state = reactive<SocketState>({
    connected: false,
    inProcess: false,
    results: [],
});

const URL = import.meta.env.VITE_SERVER;

export const socket = io(URL);

socket.on('connect', () => {
    state.connected = true;
});

socket.on('train-res', (...args) => state.results.push(args as TrainResults[]));

socket.on('train-done', () => {
    state.inProcess = false;
});

socket.on('disconnect', () => {
    state.connected = false;
});
