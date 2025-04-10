# 📚 Book Review Application

This project is part of the [IBM Full Stack Software Developer Professional Certificate](https://www.coursera.org/professional-certificates/ibm-full-stack-cloud-developer) on Coursera.

The Book Review Application is a web-based platform that allows users to register, log in, and interact with a collection of books by leaving reviews. The application features a secure REST API with JWT-based authentication and session management, allowing users to add, view, and delete their reviews.

---

## 📦 Project Structure

The application consists of the following main components:

- **User Authentication**: Uses JWT and sessions to manage secure logins for users.
- **Book Data**: Static book collection with titles, authors, and reviews, which can be filtered and searched by various parameters (ISBN, title, author).
- **Review Management**: Users can add, update, and delete their reviews for books.
- **REST API**: Implements CRUD operations to handle books and reviews.
- **Async/Await and Promises**: Asynchronous functionality for API calls and data fetching.
- **Deployment**: Hosted locally for testing and development.

---

## 🚀 Features

- **Book Listing**: Displays books with their titles, authors, and a section for user-submitted reviews.
- **User Authentication**: Register, log in, and authenticate with JWT and session management.
- **Search & Filter**: Find books by title, author, or ISBN.
- **Review Management**: Users can add, update, and delete reviews for books they’ve read.
- **Error Handling**: Graceful handling of invalid requests or missing data.

---

## 🛠️ Technologies Used

- **Node.js** with **Express** for server-side development
- **JWT** (JSON Web Tokens) for user authentication
- **Express-Session** for session management
- **Axios** for API requests
- **JavaScript (ES6+)** for asynchronous operations
- **JSON** for data storage (book and review data)
- **Postman** for API testing

---

## 📂 Installation & Local Development

```bash
git clone https://github.com/<your-username>/expressBookReviews.git
cd expressBookReviews/final_project
npm install
node index.js
```
