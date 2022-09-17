# Проект: Музыкальный сервис (серверная часть)

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" />
</p>

## Описание
Серверная часть музыкального сервиса

## Функциональность
* Загрузка и удаление песен на сервер и БД
* Поиск песен
* Создание и удаление альбомов
* Загрузка и удаление аватара
* Раздача статики

## Технологии
* NestJS
* NodeJS
* TypeScript
* MongoDB

## Адреса
Сервер - [https://Music.stmelik.repl.co/](https://Music.stmelik.repl.co/)

Проект - [https://music-platform-frontend-six.vercel.app/](https://music-platform-frontend-six.vercel.app/)

## Установка и запуск сервера
1. Клонировать репозиторий:  
  `clone https://github.com/StMelik/music-platform-api.git`

2. Перейти в папку с сервером:  
  `cd music-platform-api`

3. Установить зависимости:  
  `npm install`

4. Запустить сервер:  
  `npm run start`

## Маршруты

* Получить списка песен  
  `GET /tracks`

* Поиск песен  
  `GET /tracks/search`

* Получить подробности о песне  
  `GET /tracks/:id`

* Получить все альбомы  
  `GET /albums`

* Получить подробности об альбоме  
  `GET /albums/:id`

* Добавить песню  
  `POST /tracks`

* Добавить комментарий к песне  
  `POST /tracks/comment`

* Добавить прослушивание к песне  
  `POST /tracks/listen/:id`

* Создать альбом  
  `POST /albums`

* Добавить песню в альбом  
  `POST /albums/:id`

* Удалить песню из альбома  
  `PUT /albums/:id`

* Удалить песню  
  `DELETE /tracks/:id`

* Удалить альбом  
  `DELETE /albums/:id`
