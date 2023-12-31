# Фронтенд приложения для распознавания изображений

[Бэкенд](https://github.com/gfnIvanov/ImageDetectApp-serv)

[Сервис обучения](https://github.com/gfnIvanov/ImageDetectApp-train)

## Обзор

Фронтенд позволяет задать параметры и запустить обучение модели, отображает параметры обучения используемой модели и позволяет использовать предобученную модель для распознавания загруженных изображений.

Используется websocket-соединение с сервером для получения информации о процессе обучения в реальном времени.

В качестве фреймворка используется [Vue 3](https://v3.ru.vuejs.org/) в связке с [Vue Router](https://router.vuejs.org/) и [TypeScript](https://www.typescriptlang.org/).

Сборка производится с [Vite](https://vitejs.dev/).

Развертывание приложения (фронт, бэк и сервис обучения) производится при помощи docker-compose (файл на стороне сервера).

## Технологии

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
