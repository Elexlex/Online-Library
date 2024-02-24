const express = require('express');
const Book = require('../models/book');
const Genre = require('../models/genre');
const Author = require('../models/author');
const fs = require('fs');
const path = require('path');
const CsvParser = require("json2csv").Parser;

const router = express.Router();

router.get('/export-books', async (req, res) => {
  try {
    const books = await Book.findAll({
      include: [Genre, Author],  
    });

    let booksData = [];

    books.forEach((book) => {
      const { bookId, title, Genres: genres, Authors: authors, description, isAvailable } = book;
      const genreNames = genres ? genres.map(genre => genre.name).join(', ') : '';
      const authorNames = authors ? authors.map(author => author.name).join(', ') : '';
      booksData.push({ bookId, title, genres: genreNames, authors: authorNames, description, isAvailable });
    });    

    const csvFields = ["bookId", "title", "genres", "authors", "description", "isAvailable"];
    const csvParser = new CsvParser({ csvFields });
    const csvData = csvParser.parse(booksData);


    const filePath = path.join(__dirname, 'booklist.csv');
    fs.writeFileSync(filePath, csvData);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=booklist.csv");
    res.status(200).sendFile(filePath);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/users/all', async (req, res) => {
  try {
    if (req.isAuthenticated() && req.user.roleId === 1) {
      const users = await User.findAll({
        attributes: ['userId', 'username', 'email', 'roleId'],
      });
      res.json(users);
    } else {
      res.status(403).json({ message: 'Forbidden' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.put('/users/:userId/:roleId', async (req, res) => {
  try {
    if (req.isAuthenticated() && req.user.roleId === 1) {
      const { userId, roleId } = req.params; 

      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const role = await Role.findByPk(roleId);

      if (!role) {
        return res.status(404).json({ message: 'Role not found' });
      }

      user.roleId = roleId;
      await user.save();

      res.json({ message: 'User role updated successfully', user });
    } else {
      res.status(403).json({ message: 'Forbidden' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;
