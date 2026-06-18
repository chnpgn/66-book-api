# 66-book-api

## Overview

`66-book-api` is a RESTful Bible reference API for the King James Version (KJV). It exposes endpoints for:

- listing books of the Bible
- fetching chapters, individual verses, and verse ranges
- retrieving random and daily verses
- searching verse text using full-text search

The API is built with Express and Prisma, backed by a MySQL-compatible database.

## Stack

- Node.js
- Express
- Prisma ORM
- MariaDB / MySQL-compatible database
- dotenv for environment configuration
- nodemon for local development

## Features

- GET `/api/v1/books` - list all books
- GET `/api/v1/books/:book` - get details for a single book
- GET `/api/v1/books/:book/chapters/:chapter` - get all verses in a chapter
- GET `/api/v1/books/:book/chapters/:chapter/verses/:verse` - get a single verse
- GET `/api/v1/books/:book/chapters/:chapter/range?start=X&end=Y` - get a verse range
- GET `/api/v1/passages` - retrieve a passage from query parameters
- GET `/api/v1/passages/random` - retrieve a random verse
- GET `/api/v1/passages/daily` - retrieve a daily verse
- GET `/api/v1/search?q=term&page=1&limit=10` - full-text search on verses

## Requirements

- Node.js 18+ (or compatible modern Node version)
- npm
- A MySQL-compatible database (MariaDB/MySQL)

## Setup

1. Clone the repository:

   ```bash
   git clone <repo-url>
   cd 66-book-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root with your database connection. Choose one option:

   **Option A: Using DATABASE_URL**
   ```env
   DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
   PORT=3000
   ```

   **Option B: Using individual variables**
   ```env
   DATABASE_HOST=localhost
   DATABASE_USER=bookapi
   DATABASE_PASSWORD=your_password
   DATABASE_NAME=book_api
   DATABASE_PORT=3306
   PORT=3000
   ```

4. If your database is new, set up the schema using Prisma:

   ```bash
   npx prisma db push
   ```

5. Seed the database with Bible data:

   ```bash
   npm run seed:bible
   ```

   This imports all verse data from `database/seeds/` JSON files into the `books` and `verses` tables.

## Run Locally

Start the API in development mode:

```bash
npm run dev
```

Or run directly with Node:

```bash
node src/index.js
```

The server listens on `http://localhost:3000` by default, or the port defined in `.env`.

## Run with Docker

Build and run the application with Docker Compose:

```bash
docker compose up --build
```

This starts both the Node.js API and a MariaDB database container. The API is accessible at `http://localhost:3000`.

To stop:

```bash
docker compose down
```

## API Base URL

- `http://localhost:3000/api/v1/books`
- `http://localhost:3000/api/v1/passages`
- `http://localhost:3000/api/v1/search`

## Notes

- The app uses ES modules, so `type: "module"` is enabled in `package.json`.
- Search uses a full-text query in the `verses` table.
- If you use a Docker database, set `DATABASE_URL` to point to the container.
- Verse IDs are BigInt; they are automatically serialized to strings in JSON responses.

## Testing

Use the included HTTP client file `client.http` in VS Code with the REST Client extension:

```http
@base_address = http://localhost:3000/api/v1

### Get all books
GET {{base_address}}/books

### Get a specific book
GET {{base_address}}/books/John

### Get a chapter
GET {{base_address}}/books/Genesis/chapters/3

### Get a specific verse
GET {{base_address}}/books/Genesis/chapters/3/verses/3

### Get a verse range
GET {{base_address}}/books/Exodus/chapters/33/range?start=16&end=18

### Get a passage by reference
GET {{base_address}}/passages?book=john&start=3:16&end=4:5

### Get a random verse
GET {{base_address}}/passages/random

### Get today's daily verse
GET {{base_address}}/passages/daily

### Search verses
GET {{base_address}}/search?q=faith&page=1&limit=20
```
