# 🔌 API / Database Connection Developer Guide

This document outlines what the API/DB connection developer needs to build.
For implementation details (schema, code stubs, middleware, server wiring), see [`BACKEND.md`](./BACKEND.md).

---

## 🎯 Your Role

You are responsible for building the **Express route controllers** that connect the frontend to the database.
The backend developer has already set up `database.js`, `schema.sql`, and `server.js`. You wire the routes.

---

## 🚀 Getting Started

After cloning the repo, run:
```cmd
npm install
```
This installs everything — `bcrypt`, `jsonwebtoken`, `express`, `pg`, etc. are all in `package.json`.

You **do not** need to install PostgreSQL yourself if the backend developer's database is accessible on the network. Just update your `.env` with the correct `DB_HOST`, `DB_USER`, and `DB_PASSWORD`.

If working offline or independently, install PostgreSQL and ask the backend dev to share the schema:
```cmd
psql -U postgres -d library_db -f database/schema.sql
```

---

## ⚙️ Environment Setup

Copy `.env.example` to `.env` and fill in your local PostgreSQL credentials:

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=library_db
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_secret
```

---

## 🚦 Routes to Build

> **Stub files already exist** — `controller(api)/userRoutes.js` and `controller(api)/bookRoutes.js` are created with empty route handlers returning `501`. Fill in each one.

### `controller(api)/userRoutes.js`

- [ ] `POST   /api/users/register`       → hash password, insert user, return JWT
- [ ] `POST   /api/users/login`          → verify password, return JWT
- [ ] `GET    /api/users/me`             → return logged-in user profile  *[auth required]*
- [ ] `GET    /api/users/me/loans`       → return user's active + past loans *[auth required]*
- [ ] `GET    /api/users`               → return all users *[admin only]*
- [ ] `GET    /api/users/:id`            → return single user + their loans *[admin only]*
- [ ] `PUT    /api/users/:id`            → update role or deactivate account *[admin only]*
- [ ] `DELETE /api/users/:id`            → delete user from system *[admin only]*

### `controller(api)/bookRoutes.js`

- [ ] `GET    /api/books`               → list all books with availability
- [ ] `GET    /api/books/:id`            → single book detail
- [ ] `POST   /api/books`               → add a book *[admin only]*
- [ ] `PUT    /api/books/:id`            → update book info *[admin only]*
- [ ] `DELETE /api/books/:id`            → remove book *[admin only]*
- [ ] `POST   /api/books/:id/borrow`    → create a loan, decrement available_copies *[auth required]*
- [ ] `POST   /api/books/:id/return`    → close loan, calculate late fee, increment available_copies *[auth required]*

---

## ✅ Definition of Done

- [ ] `/api/users/register` and `/api/users/login` return a JWT
- [ ] All book CRUD endpoints work
- [ ] Borrow endpoint decrements `available_copies` and creates a loan record
- [ ] Return endpoint closes the loan and calculates late fee correctly
- [ ] Auth middleware protects all routes marked `[auth required]`
- [ ] Admin routes reject non-admin users with `403`
