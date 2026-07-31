# Cocktail Bar

![Angular](https://img.shields.io/badge/Angular-21-DD0031?style=flat\&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat\&logo=typescript)
![IndexedDB](https://img.shields.io/badge/Storage-IndexedDB-orange)
![Angular Material](https://img.shields.io/badge/UI-Angular%20Material-757575?style=flat\&logo=materialdesign)

Cocktail Bar — современное веб-приложение для создания, хранения и управления собственной коллекцией коктейлей.

Проект демонстрирует разработку полноценного frontend-приложения на Angular 21 с использованием современных подходов: standalone-компонентов, реактивных форм, строгой типизации и локального хранения данных через IndexedDB.

---

## Возможности

* Создание новых коктейлей
* Добавление рецепта и описания
* Загрузка изображений коктейлей
* Предпросмотр изображения перед сохранением
* Хранение данных непосредственно в браузере
* Просмотр списка созданных коктейлей
* Валидация пользовательского ввода
* Компонентная архитектура приложения
* Адаптивный интерфейс

---

## Технологический стек

### Frontend

* Angular 21
* TypeScript
* Angular Reactive Forms
* Angular Material
* SCSS

### Хранение данных

* IndexedDB
* Browser Storage API


### IndexedDB вместо LocalStorage

Для хранения данных используется IndexedDB.

Выбор обусловлен необходимостью работы с изображениями и бинарными данными.

| LocalStorage       | IndexedDB                 |
| ------------------ | ------------------------- |
| Только строки      | Объекты и бинарные данные |
| Ограниченный объём | Большой объём данных      |
| Синхронный API     | Асинхронный API           |
| Нет поддержки Blob | Работа с изображениями    |

Использование IndexedDB позволяет сохранять изображения коктейлей непосредственно в браузере без необходимости отдельного backend-хранилища.

---

### Особенности работы с изображениями

Процесс обработки изображения:

```text
Выбор файла
      ↓
Проверка формата
      ↓
Создание Blob URL
      ↓
Отображение предпросмотра
      ↓
Сохранение Blob в IndexedDB
      ↓
Восстановление изображения при загрузке приложения
```

---

## Установка и запуск

Клонирование репозитория:

```bash
git clone https://github.com/Kirill-Bokov/cocktail-bar
```

Переход в директорию проекта:

```bash
cd cocktail-bar
```

Установка зависимостей:

```bash
npm install
```

Запуск development-сервера:

```bash
npm start
```

После запуска приложение доступно:

```text
http://localhost:4200
```
---

## Автор

Frontend Developer

GitHub: https://github.com/Kirill-Bokov
