# Мессенджер | ![Project Status](https://img.shields.io/badge/status-development-green) ![Netlify Build](https://img.shields.io/netlify/10e7e0c9-8fed-461c-8611-6a04f963867a)

Netlify: https://polite-selkie-cbf8bc.netlify.app/

Yandex Cloud: https://bbaip18jbcf24nc42cfk.containers.yandexcloud.net/

## PRs

Sprint 1: https://github.com/alexTaraskina/middle.messenger.praktikum.yandex/pull/1  
Sprint 2: https://github.com/alexTaraskina/middle.messenger.praktikum.yandex/pull/2  
Sprint 3: https://github.com/alexTaraskina/middle.messenger.praktikum.yandex/pull/4  
Sprint 4: https://github.com/alexTaraskina/middle.messenger.praktikum.yandex/pull/5

## Установка

- `npm install` — инициализация
- `npm run dev` — запуск версии для разработчика
- `npm run build` — сборка стабильной версии

## Файловая структура 
    
```bash
├── static - статичный контент (иконки, картинки, шрифты)
└── src - исходный код, подлежащий постобработке бандлером
				├── core
				├── helpers - вспомогательные модули
    ├── pages - макеты страниц
    ├── partials - частичные представления
    │   ├── components - компоненты-атомы, которые будут использованы в двух и более модулях
    │   └── modules - копоненты-молекулы, состоящие из нескольких компонентов-автомов
    ├── scripts - временная директория для скриптов  
    └── styles - общие стили
```
