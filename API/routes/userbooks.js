const express = require('express');
const UserBook = require('../models/userbooks');
const Book = require('../models/book');
const Genre = require('../models/genre');
const Author = require('../models/author');
const router = express.Router();

router.post('/new/:bookId', async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const { bookId } = req.params;
      const { userId } = req.user;

      const book = await Book.findByPk(bookId);

      if (!book || !book.isAvailable) {
        return res.status(400).json({ message: 'Book not available or does not exist' });
      }

      const existingFavorite = await UserBook.findOne({
        where: { userId, bookId },
      });

      if (existingFavorite) {
        return res.status(400).json({ message: 'Book already in favorites' });
      }

      await UserBook.create({ userId, bookId });
      res.json({ message: 'Book added to favorites successfully' });
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/all', async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const { userId } = req.user;

      const favorites = await UserBook.findAll({
        where: { userId },
        include: [{
          model: Book,
          attributes: ['bookId', 'title', 'description', 'isAvailable'],
          include: [Genre, Author],  
        }],
      });

      const books = favorites.map(favorite => favorite.Book);

      res.json(books);
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.delete('/delete/:bookId', async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const { bookId } = req.params;
      const { userId } = req.user;

      const favorite = await UserBook.findOne({
        where: { userId, bookId },
      });

      if (!favorite) {
        return res.status(404).json({ message: 'Book not found in favorites' });
      }

      await favorite.destroy();
      res.json({ message: 'Book removed from favorites successfully' });
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
