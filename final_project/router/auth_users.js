const express = require('express');
const jwt = require('jsonwebtoken');
let books = require('./booksdb.js');
const regd_users = express.Router();

let users = [];

const isValid = username => {
  return users.some(user => user.username === username);
};

const authenticatedUser = (username, password) => {
  return users.some(
    user => user.username === username && user.password === password
  );
};

//only registered users can login
regd_users.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: 'Username and password are required' });
  }

  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign(
      { username: username },
      'access', // Secret key
      { expiresIn: '1h' }
    );

    req.session.authorization = {
      accessToken,
    };

    return res.status(200).json({ message: 'Login successful' });
  } else {
    return res
      .status(401)
      .json({ message: 'Invalid login. Check username and password' });
  }
});

// Add a book review
regd_users.put('/auth/review/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  const review = req.query.review;
  const username = req.user.username;

  if (!review) {
    return res.status(400).json({ message: 'Review is required' });
  }

  let book = books[isbn];
  if (book) {
    book.reviews[username] = review;
    return res
      .status(200)
      .json({ message: 'Review added/updated successfully' });
  } else {
    return res.status(404).json({ message: 'Book not found' });
  }
});

// Delete a book review
regd_users.delete('/auth/review/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  const username = req.user.username;

  let book = books[isbn];
  if (book) {
    if (book.reviews[username]) {
      delete book.reviews[username];
      return res.status(200).json({ message: 'Review deleted successfully' });
    } else {
      return res.status(404).json({ message: 'Review by this user not found' });
    }
  } else {
    return res.status(404).json({ message: 'Book not found' });
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
