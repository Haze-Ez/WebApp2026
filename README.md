# 📚 Library WebApp

A full-stack library management system where users can browse, borrow, and return books — free of charge, with a late fee policy for overdue returns.

---

## 🧩 Project Overview

This system allows:
- Users to **register and log in**
- Users to **browse available books**
- Users to **borrow a book** (if copies are available)
- Users to **return a book** at any time
- The system to **track due dates** and **flag overdue returns**
- Late fees to be **calculated automatically** for overdue books

Borrowing is **free**. Fees only apply when a book is returned **past the due date**.

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Backend (API) | Node.js + Express |
| Database | PostgreSQL |
| DB Client | `pg` (node-postgres) |
| Auth | JWT via `jsonwebtoken` |
| Frontend | HTML / CSS / JavaScript (React-ready) |
| Environment | `dotenv` |

---

## 📁 Project Structure

```
WebApp2026/
├── backend/
│   ├── server.js           # Express entry point
│   ├── database.js         # PostgreSQL connection pool
│   └── model/
│       ├── user.js         # User DB queries
│       └── book.js         # Book DB queries
├── controller/
│   ├── userRoutes.js       # /api/users/*  [TODO - API dev]
│   └── bookRoutes.js       # /api/books/*  [TODO - API dev]
├── frontend/               # [TODO - Frontend dev]
│   ├── index.html
│   ├── login.html
│   ├── dashboard.html
│   └── style.css
├── .env                    # Local secrets — DO NOT COMMIT
├── .env.example            # Safe template for teammates
├── .gitignore
└── package.json
```

---

## ⚙️ Setup Instructions

### 1. Clone the repo
```bash
git clone <repo-url>
cd WebApp2026
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment
```bash
cp .env.example .env
```
Edit `.env` with your local PostgreSQL credentials.

### 4. Set up the database
```bash
# Create the database in PostgreSQL
createdb library_db
```
> Schema migration scripts will be added to `/database/` — see `API_CONNECTION.md`.

### 5. Run the server
```bash
npm run dev     # Development (nodemon, auto-restart)
npm start       # Production
```

---

## 📋 Role-Specific Docs

| Role | Document |
|---|---|
| Frontend Developer | [`FRONTEND.md`](./FRONTEND.md) |
| API / DB Connection Developer | [`API_CONNECTION.md`](./API_CONNECTION.md) |

---

## 📐 Business Rules

| Rule | Detail |
|---|---|
| Borrowing is free | No charge to borrow a book |
| Borrow limit | TBD (suggest: 3 books per user at a time) |
| Loan period | TBD (suggest: 14 days) |
| Late fee | TBD (suggest: $0.25/day overdue) |
| Return policy | Any time, no penalty if on time |
| Book availability | A book can only be borrowed if copies > 0 |
