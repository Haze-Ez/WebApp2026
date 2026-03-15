const pool = require('../database');

// Get all books (joined with author name)
const getAllBooks = async () => {
    const result = await pool.query(`
        SELECT b.id, b.title, b.genre, b.total_copies, b.available_copies, b.created_at,
               a.id AS author_id, a.name AS author_name
        FROM books b
        LEFT JOIN authors a ON b.author_id = a.id
        ORDER BY b.title ASC
    `);
    return result.rows;
};

// Get a single book by ID (joined with author)
const getBookById = async (id) => {
    const result = await pool.query(`
        SELECT b.id, b.title, b.genre, b.total_copies, b.available_copies, b.created_at,
               a.id AS author_id, a.name AS author_name, a.bio AS author_bio, a.nationality AS author_nationality
        FROM books b
        LEFT JOIN authors a ON b.author_id = a.id
        WHERE b.id = $1
    `, [id]);
    return result.rows[0];
};

// Create a new book
const createBook = async ({ title, author_id, genre, total_copies }) => {
    const result = await pool.query(
        'INSERT INTO books (title, author_id, genre, total_copies, available_copies) VALUES ($1, $2, $3, $4, $4) RETURNING *',
        [title, author_id, genre, total_copies]
    );
    return result.rows[0];
};

// Update book info
const updateBook = async (id, fields) => {
    // TODO: build dynamic UPDATE query from fields object
};

// Adjust available copies — pass -1 to borrow, +1 to return
const updateAvailableCopies = async (bookId, delta) => {
    const result = await pool.query(
        'UPDATE books SET available_copies = available_copies + $1 WHERE id = $2 RETURNING *',
        [delta, bookId]
    );
    return result.rows[0];
};

// Delete a book
const deleteBook = async (id) => {
    await pool.query('DELETE FROM books WHERE id = $1', [id]);
};

module.exports = { getAllBooks, getBookById, createBook, updateBook, updateAvailableCopies, deleteBook };
