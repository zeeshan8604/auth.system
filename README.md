# Auth System

A basic authentication system using Node.js, Express, MySQL, and JWT for user registration, login, and profile retrieval.

## Features

- User registration with unique username and email
- User login with JWT token generation
- Protected profile endpoint to retrieve user information

## Requirements

- Node.js
- MySQL

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/auth-system.git
    cd auth-system
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up the MySQL database:**

    - Start the MySQL server.
    - Log into MySQL:

      ```bash
      mysql -u root -p
      ```

    - Create a new database:

      ```sql
      CREATE DATABASE auth_db;
      ```

    - Use the new database:

      ```sql
      USE auth_db;
      ```

    - Create the `users` table:

      ```sql
      CREATE TABLE users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(255) NOT NULL UNIQUE,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL
      );
      ```

4. **Configure environment variables:**

    Create a `.env` file in the root directory and add the following:

    ```plaintext
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=yourpassword
    DB_NAME=auth_db
    JWT_SECRET=your_jwt_secret
    ```

5. **Start the development server:**

    ```bash
    npm run dev
    ```

6. **Run tests:**

    ```bash
    npm test
    ```

## Usage

- **Register a new user:**

    Send a POST request to `/api/register` with the following JSON body:

    ```json
    {
        "username": "testuser",
        "email": "test@example.com",
        "password": "testpassword"
    }
    ```

- **Login a user:**

    Send a POST request to `/api/login` with the following JSON body:

    ```json
    {
        "email": "test@example.com",
        "password": "testpassword"
    }
    ```

- **Retrieve profile of logged-in user:**

    Send a GET request to `/api/profile` with the `Authorization` header set to `Bearer YOUR_JWT_TOKEN`.

    Replace `YOUR_JWT_TOKEN` with the token received from the login response.

## Project Structure

