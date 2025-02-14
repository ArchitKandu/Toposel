# User Authentication API

This is a Node.js-based user authentication system using **Express.js, Mongoose, JWT, and bcrypt**. It provides user registration, login, authentication middleware, and a user search API.

## Features

- **User Registration** with password hashing and validation
- **User Login** with JWT token generation
- **Middleware for Authentication** using JWT
- **User Search** based on username or full name
- **MongoDB with Mongoose** for data storage

---

## Installation

### Prerequisites

Ensure you have Node.js installed and created cloud storage in MongoDB Atlas.

### Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/ArchitKandu/Toposel.git
   cd Toposel
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add:
   ```env
   MONGODB_URI = mongodb_connection_string
   PORT = port_number
   JWT_SECRET = secret_key
   ```
4. Start the server:
   ```sh
   npm start
   ```

---

## API Endpoints

### **1. User Registration**

- **Endpoint:** `POST /api/register`
- **Body:**
  ```json
  {
    "userName": "test@example.com",
    "password": "StrongPass@123",
    "fullName": "John Doe",
    "gender": "Male",
    "dateOfBirth": "2000-01-01",
    "country": "USA"
  }
  ```
- **Response:**
  ```json
  {
    "_id": "userId",
    "userName": "test@example.com",
    "password": "encrypted_password",
    "fullName": "John Doe",
    "gender": "Male",
    "dateOfBirth": "2000-01-01",
    "country": "USA"
    "token": "jwt_token"
  }
  ```

### **2. User Login**

- **Endpoint:** `POST /api/login`
- **Body:**
  ```json
  {
    "userName": "test@example.com",
    "password": "StrongPass@123"
  }
  ```
- **Response:**
  ```json
  {
    "_id": "userId",
    "userName": "test@example.com",
    "fullName": "John Doe",
    "gender": "Male",
    "dateOfBirth": "2000-01-01",
    "country": "USA"
  }
  ```

### **3. User Search (Authenticated)**

- **Endpoint:** `GET /api/user?search=name`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer jwt_token"
  }
  ```
- **Response:**
  ```json
  [
    {
      "_id": "userId",
      "userName": "test@example.com",
      "password": "encrypted_password",
      "fullName": "John Doe",
      "gender": "Male",
      "dateOfBirth": "2000-01-01",
      "country": "USA",
      "__v": 0
    }
  ]
  ```

---

## Project Structure

```
|-- controllers/
|   |-- userControllers.js
|-- middleware/
|   |-- authorizeMiddleware.js
|   |-- errorMiddleware.js
|-- model/
|   |-- userSchema.js
|-- routes/
|   |-- userRoutes.js
|-- config/
|   |-- db.js
|   |-- generateToken.js
|-- server.js
|-- .env
|-- package.json
```

---

## Issues & Troubleshooting

### **1. User Not Found in Search API**

- Ensure the `Authorization` header includes a valid **JWT token**.
- Make sure the `protect` middleware correctly decodes and assigns `req.user`.

### **2. Password Not Encrypting**

- Ensure `bcrypt` is installed (`npm install bcryptjs`).
- Check `userSchema.pre("save")` method for correct execution.

### **3. MatchPassword Function Not Working**

- Use `function` instead of arrow function in `userSchema.methods.matchPassword`:
  ```js
  userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  ```

---