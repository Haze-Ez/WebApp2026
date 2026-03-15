const pool = require('../database');

// Get all users
const getAllUsers = async () => {
    const result = await pool.query('SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC');
    return result.rows;
};

// Get a single user by ID
const getUserById = async (id) => {
    const result = await pool.query(
        'SELECT id, name, email, role, created_at FROM users WHERE id = $1',
        [id]
    );
    return result.rows[0];
};

// Get a user by email (used for login)
const getUserByEmail = async (email) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
};

// Create a new user
const createUser = async ({ name, email, hashedPassword }) => {
    const result = await pool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, role',
        [name, email, hashedPassword]
    );
    return result.rows[0];
};

// Update a user's role or status (admin use)
const updateUser = async (id, fields) => {
    // TODO: build dynamic UPDATE query from fields object
};

// Delete a user
const deleteUser = async (id) => {
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
};

module.exports = { getAllUsers, getUserById, getUserByEmail, createUser, updateUser, deleteUser };
