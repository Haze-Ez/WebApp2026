const express = require('express');
const router = express.Router();
const authMiddleware = require('../backend/middleware/auth');
const adminOnly = require('../backend/middleware/adminOnly');

const { getAllBooks, getBookById, createBook, updateBook, updateAvailableCopies, deleteBook } = require('../backend/model/book');

// ─── Public Routes ────────────────────────────────────────────────────────────

// GET /api/books
router.get('/', async (req, res) => {
    
    const books = await getAllBooks();
    if (!books){
        return res.status(400).json({message:'books not  found'});
    }
    res.status(200).json(books);
});

// GET /api/books/:id
router.get('/:id', async (req, res) => {
   const book = await getBookById(req.params.id);
   if (!book){
    return res.status(400).json({message:'The book you are searching for isn\'t available '});
   }
   res.status(200).json(book);
});

// ─── Protected Routes (auth required) ────────────────────────────────────────

// POST /api/books/:id/borrow
router.post('/:id/borrow', authMiddleware, async (req, res) => {
    
    
    const book = await getBookById(req.params.id);
    if(!book){
       return res.status(400).json({message : 'Book not found'});
    }
    if (book.available_copies < 1){
       return res.status(400).json({message :'No Available copies '});
    }
    const pool = require ('../backend/database');
     const loanResult = await pool.query(
<<<<<<< HEAD
        'INSERT INTO loans (user_id, book_id, due_date) VALUES ($1, $2, NOW() + INTERVAL \'14 days\') RETURNING *',
=======
        'INSERT INTO loans (user_id , book_id,due_date) VALUES ($1,$2,NOW()+ INTERVAL \'14 days \') RETURNING *',
>>>>>>> 3c5dab6f096799e0461d596c998ccbbb4b24ca2b
        [req.user.id, book.id]
     );
     const loan =loanResult.rows[0];
     await updateAvailableCopies(book.id,-1);

     res.status(201).json(loan);
    

});

// POST /api/books/:id/return
router.post('/:id/return', authMiddleware, async (req, res) => {
    
    const bookId = req.params.id
    
     const pool = require ('../backend/database');
     const loanResult = await pool.query(
        'SELECT * FROM loans WHERE user_id =$1 AND book_id = $2 AND returned_at IS NULL ',
        [req.user.id, bookId]
     );
     const loan = loanResult.rows[0];
     if (!loan){
       return res.status(400).json({message :'No loan found '});
     };
     const now  = new Date();
     const dueDate = new Date(loan.due_date);
<<<<<<< HEAD
     const daysOverDue = Math.floor((now - dueDate) / (1000 * 60 * 60 * 24));
     const lateFee = daysOverDue > 0 ? daysOverDue * 0.25 : 0;
=======
     const daysOverDue= Math.floor((now-dueDate)/(1000*60*60*24));
     const lateFee = daysOverDue >0 ? daysOverDue *0.25 :0;
>>>>>>> 3c5dab6f096799e0461d596c998ccbbb4b24ca2b

      const updated = await pool.query(
        'UPDATE loans SET returned_at = NOW(), late_fee =$1 WHERE id = $2 RETURNING *',
        [lateFee, loan.id]
     );



      await updateAvailableCopies(bookId, +1);
     res.status(200).json(updated.rows[0]);

});

// ─── Admin Routes ─────────────────────────────────────────────────────────────

// POST /api/books
router.post('/', authMiddleware, adminOnly, async (req, res) => {
    //  createBook(req.body) — expects { title, author_id, genre, total_copies }
    const {title, author_id, genre ,total_copies} = req.body;

  
    const newBook = await createBook ({title, author_id, genre ,total_copies});
    res.status(201).json(newBook);
    
    
});

// PUT /api/books/:id
router.put('/:id', authMiddleware, adminOnly, async (req, res) => {
    //  updateBook(req.params.id, req.body)
   
    const book = await getBookById (req.params.id)
    
        if(!book)
        {
          return  res.status(400).json({message: 'book not found !'});
        }

        const updatedBook = await updateBook(req.params.id, req.body);
        res.status(200).json(updatedBook);

    
});

// DELETE /api/books/:id
router.delete('/:id', authMiddleware, adminOnly, async (req, res) => {
    //  deleteBook(req.params.id)
    
    const book = await getBookById(req.params.id);
    if(!book)
    {
      return   res.status(400).json({message : 'Books does not exist !'});
    }
    await deleteBook(req.params.id);

    res.status(200).json({message :'Book successfully deleted !'});
});

module.exports = router;
