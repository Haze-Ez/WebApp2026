-- ============================================================
-- LibraryApp Database Schema
-- Run this file once to set up the database tables.
-- Usage: psql -U postgres -d library_db -f database/schema.sql
-- ============================================================

-- Drop tables in reverse dependency order
DROP TABLE IF EXISTS loans;
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS authors;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    email       VARCHAR(150) UNIQUE NOT NULL,
    password    VARCHAR(255) NOT NULL,         -- bcrypt hashed
    role        VARCHAR(20) DEFAULT 'member',  -- 'member' | 'admin'
    created_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE authors (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(150) NOT NULL,
    bio         TEXT,
    nationality VARCHAR(100),
    created_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE books (
    id               SERIAL PRIMARY KEY,
    title            VARCHAR(255) NOT NULL,
    author_id        INT REFERENCES authors(id),
    genre            VARCHAR(100),
    total_copies     INT DEFAULT 1,
    available_copies INT DEFAULT 1,
    created_at       TIMESTAMP DEFAULT NOW()
);

CREATE TABLE loans (
    id          SERIAL PRIMARY KEY,
    user_id     INT REFERENCES users(id),
    book_id     INT REFERENCES books(id),
    borrowed_at TIMESTAMP DEFAULT NOW(),
    due_date    TIMESTAMP NOT NULL,        -- borrowed_at + loan period (e.g. 14 days)
    returned_at TIMESTAMP,                 -- NULL = not yet returned
    late_fee    DECIMAL(10, 2) DEFAULT 0.00
);
