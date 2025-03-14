# 📌 Запуск проекта

## 📦 Установка зависимостей

```sh
npm install
```

## 🚀 Запуск сервера

Вы можете запустить сервер в двух режимах:

🔹 **Обычный запуск:**

```sh
npm run start
```

*Сервер запустится с помощью Node.js.*

🔹 **Режим разработки:**

```sh
npm run dev
```

*Сервер запустится с помощью **`nodemon`**, автоматически перезапускаясь при изменениях в коде.*

---

## 🔗 Доступные эндпоинты

После запуска сервера, API будет доступно по следующим адресам:

📌 **Пользователи**:

- 📋 [Список пользователей](http://localhost:3000/users) – `GET /users` - http://localhost:3000/users
- 🔍 [Детали пользователя](http://localhost:3000/users/1) – `GET /users/1` - http://localhost:3000/users/1

📌 **Статьи**:

- 📜 [Список статей](http://localhost:3000/articles) – `GET /articles` - http://localhost:3000/articles
- 📖 [Детали статьи](http://localhost:3000/articles/1) – `GET /articles/1` - http://localhost:3000/articles/1

---


