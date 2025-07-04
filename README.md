# Book Management API with Authentication

A simple Node.js backend built with Express.js for managing books with user authentication.  
This project uses **file-based storage** (JSON files) instead of a database and implements JWT authentication.

---

## Features

- User registration and login with JWT authentication
- Password hashing with bcrypt for security
- CRUD operations for books (Create, Read, Update, Delete)
- Protected book routes accessible only by authenticated users
- File-based data storage using `fs/promises`
- MVC architecture (Model-View-Controller) for clean code organization

---

## Technologies Used

- Node.js
- Express.js
- JSON Web Tokens (JWT)
- bcrypt for password hashing
- File system (`fs/promises`) for data persistence
- dotenv for environment variables
- CORS middleware

---

## Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/ansari-katib/book-management.git
   cd book-management

# API Routes

## Authentication Routes (Public)

| Method | Endpoint           | Description             |
|--------|--------------------|-------------------------|
| POST   | /api/auth/register  | Register a new user      |
| POST   | /api/auth/login     | Login and get JWT token  |

---

## Book Routes (Protected - require JWT token)

| Method | Endpoint          | Description                  |
|--------|-------------------|------------------------------|
| GET    | /api/books        | Get all books                |
| GET    | /api/books/:id    | Get book by ID               |
| POST   | /api/books        | Create a new book            |
| PUT    | /api/books/:id    | Update book by ID            |
| DELETE | /api/books/:id    | Delete book by ID            |

---

### Notes:

- For protected routes, include JWT token in the `Authorization` header:  
  `Authorization: Bearer <your_jwt_token>`
