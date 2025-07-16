const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Routes
router.post('/add', bookController.addBook); // Add a new book
router.get('/list', bookController.getBooks); // Get books
// router.post('/', bookController.issueBook); // Issue a book
// router.post('/', bookController.returnBook); // Return a book
module.exports = router;
