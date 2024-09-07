# Sborka

## Структура

```bash
root/
├── .husky/                           # Скрипты для хуков Git
├── dist/                             # Сборка проекта
│   ├── css/                          # Стили
│   │   └── style.css
│   ├── fonts/                        # Шрифты
│   ├── images/                       # Изображения
│   ├── js/                           # Скрипты
│   │   └── main.js
│   ├── index.html                    # Главная страница
│   └── *.html                        # Другие страницы
├── node_modules/                     # Зависимости npm
├── src/                              # Исходный код проекта
│   ├── assets/                       # Медиа и данные
│   │   ├── data/                     # Данные
│   │   ├── fonts/                    # Шрифты
│   │   └── images/                   # Изображения
│   ├── components/                   # Шаблоны компонентов
│   │   ├── elements/                 # Шаблоны UI-элементов
│   │   │   └── *.hbs
│   │   └── *.hbs
│   ├── js/                           # Логика приложения
│   │   ├── components/               # Логика компонентов
│   │   ├── constants/                # Константы
│   │   ├── services/                 # Сервисы
│   │   ├── utils/                    # Утилиты
│   │   └── main.js                   # Главный скрипт
│   ├── scss/                         # Стили
│   │   ├── components/               # Стили компонентов
│   │   ├── custom/                   # Кастомные стили под проект
│   │   │   ├── _colors.scss          # Переменные цветов
│   │   │   ├── _fonts.scss           # Подключение шрифтов
│   │   │   ├── _media.scss           # Брейкпоинты и миксин для использования
│   │   │   ├── _typography.scss      # Стили типографики
│   │   │   ├── _variables.scss       # Прочие переменные под проект
│   │   │   └── _base.scss            # Базовые стили под проект
│   │   ├── elements/                 # Стили UI-элементов
│   │   ├── global/                   # Общие стили
│   │   │   ├── _functions.scss       # Функции
│   │   │   ├── _mixins.scss          # Миксины
│   │   │   └── _null.scss            # Обнуляющие стили
│   │   ├── vendor/                   # Вендорные стили
│   │   └── styles.scss               # Главный SCSS файл
│   ├── stores/                       # Хранилища состояния
│   │   ├── context.js                # Контекст приложения
│   │   ├── home.js                   # Логика для страницы Home
│   │   └── *.js                      # Другие скрипты
│   ├── index.html                    # Главная страница
│   └── *.html                        # Другие HTML страницы
├── .env.local                        # Локальные переменные окружения
├── .gitignore                        # Исключения для Git
├── .prettierignore                   # Исключения для Prettier
├── .prettierrc.cjs                   # Конфигурация Prettier
├── .stylelintignore                  # Исключения для Stylelint
├── .stylelintrc                      # Конфигурация Stylelint
├── deploy.js                         # Скрипт для деплоя
├── eslint.config.js                  # Конфигурация ESLint
├── package-lock.json                 # Блокировка зависимостей npm
├── package.json                      # Конфигурация и зависимости проекта
├── README.md                         # Документация проекта
└── vite.config.js                    # Конфигурация Vite
```
