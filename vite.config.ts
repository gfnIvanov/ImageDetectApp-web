import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        host: true,
        port: 5173,
        cors: {
            origin: '*',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
