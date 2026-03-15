const express = require('express');
const router = express.Router();
const authMiddleware = require('../backend/middleware/auth');
const adminOnly = require('../backend/middleware/adminOnly');

// TODO: import user model functions
// const { getAllUsers, getUserById, getUserByEmail, createUser, updateUser, deleteUser } = require('../backend/model/user');

// ─── Public Routes ────────────────────────────────────────────────────────────

// POST /api/users/register
router.post('/register', async (req, res) => {
    // TODO:
    // 1. Extract name, email, password from req.body
    // 2. Check if email already exists (getUserByEmail)
    // 3. Hash password with bcrypt
    // 4. createUser({ name, email, hashedPassword })
    // 5. Sign a JWT with { id, email, role }
    // 6. Return token
    res.status(501).json({ message: 'Not implemented yet' });
});

// POST /api/users/login
router.post('/login', async (req, res) => {
    // TODO:
    // 1. Extract email, password from req.body
    // 2. getUserByEmail(email)
    // 3. bcrypt.compare(password, user.password)
    // 4. Sign a JWT with { id, email, role }
    // 5. Return token
    res.status(501).json({ message: 'Not implemented yet' });
});

// ─── Protected Routes (auth required) ────────────────────────────────────────

// GET /api/users/me
router.get('/me', authMiddleware, async (req, res) => {
    // TODO: getUserById(req.user.id) and return user
    res.status(501).json({ message: 'Not implemented yet' });
});

// GET /api/users/me/loans
router.get('/me/loans', authMiddleware, async (req, res) => {
    // TODO: query loans WHERE user_id = req.user.id, JOIN books and authors
    res.status(501).json({ message: 'Not implemented yet' });
});

// ─── Admin Routes ─────────────────────────────────────────────────────────────

// GET /api/users
router.get('/', authMiddleware, adminOnly, async (req, res) => {
    // TODO: getAllUsers()
    res.status(501).json({ message: 'Not implemented yet' });
});

// GET /api/users/:id
router.get('/:id', authMiddleware, adminOnly, async (req, res) => {
    // TODO: getUserById(req.params.id) + their loans
    res.status(501).json({ message: 'Not implemented yet' });
});

// PUT /api/users/:id
router.put('/:id', authMiddleware, adminOnly, async (req, res) => {
    // TODO: updateUser(req.params.id, req.body)
    res.status(501).json({ message: 'Not implemented yet' });
});

// DELETE /api/users/:id
router.delete('/:id', authMiddleware, adminOnly, async (req, res) => {
    // TODO: deleteUser(req.params.id)
    res.status(501).json({ message: 'Not implemented yet' });
});

module.exports = router;
