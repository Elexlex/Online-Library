const express = require('express');
const Book = require('../models/book');
const Genre = require('../models/genre');
const Author = require('../models/author');  
const router = express.Router();
const BookAuthor = require('../models/bookauthor');
const BookGenre = require('../models/bookgenre');

router.get('/all', async (req, res) => {
  try {
    const books = await Book.findAll({
      include: [Genre, Author],  
    });
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/new', async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      console.log("Authenticated User:", req.user);

      if (req.user.roleId === 1) {
        console.log("User is an admin");

        const { title, description, isAvailable, genreIds, authorIds } = req.body;

        const newBook = await Book.create({ title, description, isAvailable });

        if (genreIds && genreIds.length > 0) {
          await newBook.addGenres(genreIds);
        }

        if (authorIds && authorIds.length > 0) {
          await newBook.addAuthors(authorIds);
        }

        res.json({ message: 'Book added successfully', book: newBook });
      } else {
        console.log("User is not an admin");
        res.status(403).json({ message: 'Forbidden' });
      }
    } else {
      console.log("User not authenticated");
      res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/search/:bookId', async (req, res) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findByPk(bookId, {
      include: [
        { model: Genre, through: BookGenre, attributes: ['genreId', 'name'], required: false },
        { model: Author, through: BookAuthor, attributes: ['authorId', 'name'], required: false }
      ],
    });
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.delete('/delete/:bookId', async (req, res) => {
  try {
    if (req.isAuthenticated() && req.user.roleId === 1) {
      const { bookId } = req.params;
      const book = await Book.findByPk(bookId);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      await book.destroy();
      res.json({ message: 'Book deleted successfully' });
    } else {
      res.status(403).json({ message: 'Forbidden' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
