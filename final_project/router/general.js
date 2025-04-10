const express = require('express');
let books = require('./booksdb.js');
let isValid = require('./auth_users.js').isValid;
let users = require('./auth_users.js').users;
const public_users = express.Router();

public_users.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: 'Username and password are required' });
  }

  if (isValid(username)) {
    return res.status(409).json({ message: 'Username already exists' });
  }

  users.push({ username, password });
  return res.status(201).json({ message: 'User registered successfully' });
});

// Get the book list available in the shop
function getBooksAsync() {
  return new Promise((resolve, reject) => {
    try {
      resolve(books);
    } catch (err) {
      reject(err);
    }
  });
}

public_users.get('/', async function (req, res) {
  try {
    const allBooks = await getBooksAsync();
    return res.status(200).send(JSON.stringify(allBooks, null, 4));
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching books' });
  }
});

// Get book details based on ISBN
function getBookByISBN(isbn) {
  return new Promise((resolve, reject) => {
    const book = books[isbn];
    if (book) {
      resolve(book);
    } else {
      reject('Book not found');
    }
  });
}

public_users.get('/isbn/:isbn', async (req, res) => {
  const isbn = req.params.isbn;
  try {
    const book = await getBookByISBN(isbn);
    return res.status(200).json(book);
  } catch (err) {
    return res.status(404).json({ message: err });
  }
});

// Get book details based on author
function getBooksByAuthor(author) {
  return new Promise((resolve, reject) => {
    const matchingBooks = Object.values(books).filter(
      book => book.author === author
    );
    if (matchingBooks.length > 0) {
      resolve(matchingBooks);
    } else {
      reject('No books found for this author');
    }
  });
}

public_users.get('/author/:author', async (req, res) => {
  const author = req.params.author;
  try {
    const results = await getBooksByAuthor(author);
    return res.status(200).json(results);
  } catch (err) {
    return res.status(404).json({ message: err });
  }
});

// Get all books based on title
function getBooksByTitle(title) {
  return new Promise((resolve, reject) => {
    const matchingBooks = Object.values(books).filter(
      book => book.title === title
    );
    if (matchingBooks.length > 0) {
      resolve(matchingBooks);
    } else {
      reject('No books found with this title');
    }
  });
}

public_users.get('/title/:title', async (req, res) => {
  const title = req.params.title;
  try {
    const results = await getBooksByTitle(title);
    return res.status(200).json(results);
  } catch (err) {
    return res.status(404).json({ message: err });
  }
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;

  const book = books[isbn];

  if (book) {
    return res.status(200).json(book.reviews);
  } else {
    return res.status(404).json({ message: 'Book not found' });
  }
});

module.exports.general = public_users;
