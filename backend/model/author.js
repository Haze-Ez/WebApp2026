const pool = require('../database');

// Get all authors
const getAllAuthors = async () => {
    const result = await pool.query('SELECT * FROM authors ORDER BY name ASC');
    return result.rows;
};

// Get a single author by ID
const getAuthorById = async (id) => {
    const result = await pool.query('SELECT * FROM authors WHERE id = $1', [id]);
    return result.rows[0];
};

// Create a new author
const createAuthor = async ({ name, bio, nationality }) => {
    const result = await pool.query(
        'INSERT INTO authors (name, bio, nationality) VALUES ($1, $2, $3) RETURNING *',
        [name, bio, nationality]
    );
    return result.rows[0];
};

// Update an author
const updateAuthor = async (id, fields) => {
    // TODO: build dynamic UPDATE query from fields object
};

// Delete an author
const deleteAuthor = async (id) => {
    await pool.query('DELETE FROM authors WHERE id = $1', [id]);
};

module.exports = { getAllAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor };
