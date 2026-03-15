const express = require('express');
const router = express.Router();
const authMiddleware = require('../backend/middleware/auth');
const adminOnly = require('../backend/middleware/adminOnly');

// TODO: import book model functions
// const { getAllBooks, getBookById, createBook, updateBook, updateAvailableCopies, deleteBook } = require('../backend/model/book');

// ─── Public Routes ────────────────────────────────────────────────────────────

// GET /api/books
router.get('/', async (req, res) => {
    // TODO: getAllBooks() and return list
    res.status(501).json({ message: 'Not implemented yet' });
});

// GET /api/books/:id
router.get('/:id', async (req, res) => {
    // TODO: getBookById(req.params.id) and return book with author details
    res.status(501).json({ message: 'Not implemented yet' });
});

// ─── Protected Routes (auth required) ────────────────────────────────────────

// POST /api/books/:id/borrow
router.post('/:id/borrow', authMiddleware, async (req, res) => {
    // TODO:
    // 1. getBookById(req.params.id) — check available_copies > 0
    // 2. Create a loan row: user_id = req.user.id, book_id, due_date = NOW + 14 days
    // 3. updateAvailableCopies(bookId, -1)
    // 4. Return the created loan
    res.status(501).json({ message: 'Not implemented yet' });
});

// POST /api/books/:id/return
router.post('/:id/return', authMiddleware, async (req, res) => {
    // TODO:
    // 1. Find the active loan (returned_at IS NULL) for this user + book
    // 2. Set returned_at = NOW()
    // 3. Calculate late fee: if returned_at > due_date, fee = days_overdue * 0.25
    // 4. Update the loan row with returned_at and late_fee
    // 5. updateAvailableCopies(bookId, +1)
    // 6. Return updated loan
    res.status(501).json({ message: 'Not implemented yet' });
});

// ─── Admin Routes ─────────────────────────────────────────────────────────────

// POST /api/books
router.post('/', authMiddleware, adminOnly, async (req, res) => {
    // TODO: createBook(req.body) — expects { title, author_id, genre, total_copies }
    res.status(501).json({ message: 'Not implemented yet' });
});

// PUT /api/books/:id
router.put('/:id', authMiddleware, adminOnly, async (req, res) => {
    // TODO: updateBook(req.params.id, req.body)
    res.status(501).json({ message: 'Not implemented yet' });
});

// DELETE /api/books/:id
router.delete('/:id', authMiddleware, adminOnly, async (req, res) => {
    // TODO: deleteBook(req.params.id)
    res.status(501).json({ message: 'Not implemented yet' });
});

module.exports = router;
