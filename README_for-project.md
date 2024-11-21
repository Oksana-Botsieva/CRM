# ~~Project Name~~

## Версионность

- Node.js: v22.8.0 (20+);
- npm: 9.8.0;

## Скрипты

- `prepare`: Настройка Husky для автоматического запуска хуков Git.
- `lint`: Запуск линтеров ESLint, Prettier и Stylelint для проверки и исправления кода.
- `dev`: Запуск дев-сервера Vite для разработки.
- `build`: Выполнение линтинга и сборка проекта с помощью Vite.
- `preview`: Предварительный просмотр сборки с помощью Vite.
- `deploy:demo`: Сборка проекта и деплой на демо-сервер с помощью `deploy.js`.
- `deploy:prod`: Сборка проекта и деплой на продакшн-сервер с помощью `deploy.js`.

## Работа с npm

- Установка пакетов: `npm install`
- Запуск dev-сервера: `npm run dev`
- Сборка билда для продакшна: `npm run build`
- Запуск статичного сервера на основе финального бандла в директории `dist`: `npm run preview`
- Деплой (demo-сервер): `npm run deploy:prod`
- Деплой (production-сервер): `npm run deploy:prod`

Для работы скриптов `deploy` необходим корректный файл `env.local` в корне проекта.

## Стенды

- demo: [~~some link~~](https://github.com);
- prod: [~~some link~~](https://github.com).
