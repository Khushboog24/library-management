//handles the logical operations for book-related requests
const db = require('../db');


exports.addBook = async (req, res) => {
  const { username } = req.headers;
  const newBook = req.body;

  try {
    const userResult = await db.query(
      'SELECT * FROM public."Users" WHERE LOWER("UserName") = LOWER($1) AND LOWER("Role") = LOWER($2)',
      [username, 'admin']
    );

    console.log('User check result:', userResult.rows);

    if (userResult.rows.length === 0) {
      return res.status(403).json({ status: 'unauthorized user' });
    }

    const existingBook = await db.query(
      `SELECT * FROM public."Book" WHERE "BookId" = $1 OR 
       ("BookName" = $2 AND "BookAuthor" = $3)`,
      [newBook.BookId, newBook.BookName, newBook.BookAuthor]
    );

    if (existingBook.rows.length > 0) {
      return res.json({ status: 'book already exists' });
    }

    await db.query(
      `INSERT INTO public."Book" ("BookId", "BookName", "BookAuthor", "Status", "BorrowedBy")
       VALUES ($1, $2, $3, $4, $5)`,
      [
        newBook.BookId,
        newBook.BookName,
        newBook.BookAuthor,
        newBook.Status || 'available',
        newBook.BorrowedBy || ''
      ]
    );

    return res.json({ status: 'book added successfully', book: newBook });

  } catch (err) {
    console.error('Error in addBook:', err);
    return res.status(500).json({ status: 'internal server error' });
  }
};

exports.getBooks = async (req, res) => {
    const {username}= req.headers;
      try {
    const userResult = await db.query(
      'SELECT * FROM public."Users" WHERE LOWER("UserName") = LOWER($1)',
      [username]
    );

    console.log('User check result:', userResult.rows);

    if (userResult.rows.length === 0) {
      return res.status(403).json({ status: 'unauthorized user' });
    }
    const books = await db.query('SELECT * FROM public."Book"');
    return res.json({ status: 'book generated successfully', book: books.rows });

  } catch (err) {
    console.error('Error in generating:', err);
    return res.status(500).json({ status: 'internal server error' });
  }

};