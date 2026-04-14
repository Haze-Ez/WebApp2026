const express = require('express');
const router = express.Router();
const authMiddleware = require('../backend/middleware/auth');
const adminOnly = require('../backend/middleware/adminOnly');

const { getAllUsers, getUserById, getUserByEmail, createUser, updateUser, deleteUser } = require('../backend/model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// ─── Public Routes ────────────────────────────────────────────────────────────

// POST /api/users/register
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    
    const existingUser = await getUserByEmail(email);
    if (existingUser){
        return res.status(400).json({ message: 'Email already exists'});

    }
    const hashedPassword =await bcrypt.hash(password ,10);
    const user =await createUser({name,email,hashedPassword});
    const token =jwt.sign({id:user.id,email:user.email,role:user.role},
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
        );
        res.status(201).json({token});
    });

// POST /api/users/login
router.post('/login', async (req, res) => {
   const{email,password}=req.body;
    const user =await getUserByEmail(email);
    if (!user){
        return res.status(400).json({message: 'invalid email or password '})
    }
    const passwordMatch = await bcrypt.compare(password,user.password);
    if (!passwordMatch){
        return res.status(400).json({message:'invalid email or password'})
    }
    const token =jwt.sign({id:user.id,email:user.email,role:user.role},
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    )
    res.status(200).json({token});
});

// ─── Protected Routes (auth required) ────────────────────────────────────────

// GET /api/users/me
router.get('/me', authMiddleware, async (req, res) => {
    const user = await getUserById(req.user.id);
    if (!user )
    {return res.status(404).json({message:'User not found '})}
    res.status(200).json(user);
});

// GET /api/users/me/loans
router.get('/me/loans', authMiddleware, async (req, res) => {
    const pool = require ('../backend/database');
    const result = await pool.query(
        'SELECT l.id AS loan_id, l.book_id AS book_id, b.title AS book_title, l.borrowed_at AS loan_date, l.due_date AS due_date, l.returned_at AS return_date FROM loans l JOIN books b ON l.book_id = b.id WHERE l.user_id = $1 ORDER BY l.borrowed_at DESC ',
        [req.user.id]
    );
    res.status(200).json(result.rows);
    
});

// ─── Admin Routes ─────────────────────────────────────────────────────────────

// GET /api/users (for only admin )
router.get('/', authMiddleware, adminOnly, async (req, res) => {
  const users= await getAllUsers();
  res.status(200).json(users);
});

// GET (fetch) /api/users/:id
router.get('/:id', authMiddleware, adminOnly, async (req, res) => {
    const users = await getUserById(req.params.id);
    if (!users){
        return res.status(404).json({message:'user not found'})
    }
    res.status(200).json(users);
});

// PUT (update ) /api/users/:id
router.put('/:id', authMiddleware, adminOnly, async (req, res) => {
  const users = await getUserById(req.params.id);
    if (!users){
        return res.status(404).json({message:'user not found'})
    }
    const updatedUser =await updateUser(req.params.id, req.body);
    res.status(200).json(updatedUser);
});

// DELETE /api/users/:id
router.delete('/:id', authMiddleware, adminOnly, async (req, res) => {
    
    const users = await getUserById(req.params.id);
    if (!users){
        return res.status(404).json({message:'user not found'})
    }
    await deleteUser(req.params.id);
    res.status(200).json({message:'user deleted successfully'})
});

module.exports = router;
