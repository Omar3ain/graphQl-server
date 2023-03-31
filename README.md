# Apollo Server Example

This is an example of a simple Apollo Server that provides a GraphQL API for managing articles, comments, and users data.

## Prerequisites

- Node.js (version 14 or higher)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repo.git
Go to the project directory:

cd your-repo
Install the dependencies:

npm install
Start the server:

[npm start](poe://www.poe.com/_api/key_phrase?phrase=npm%20start&prompt=Tell%20me%20more%20about%20npm%20start.)
The server will start listening on http://localhost:3000.

# API

The API provides the following GraphQL types and operations:

## Types

- `Article`: represents an article that can have multiple comments. It has the following fields:
  - `id`: the unique identifier of the article.
  - `title`: the title of the article.
  - `content`: the content of the article.
  - `author`: the author of the article (a `User` type).
  - `comments`: an array of comments associated with the article (an array of `Comment` types).
- `User`: represents a user that can create articles and comments. It has the following fields:
  - `id`: the unique identifier of the user.
  - `fullname`: the full name of the user.
  - `username`: the username of the user.
  - `email`: the email address of the user.
  - `password`: the password of the user.
  - `dob`: the date of birth of the user.
- `Comment`: represents a comment associated with an article. It has the following fields:
  - `title`: the title of the comment.
  - `content`: the content of the comment.
  - `author`: the author of the comment (a `User` type).

## Queries

- `articles`: returns an array of all the articles.
- `article(id: Int!)`: returns the article with the specified `id`.

## Mutations

- `createArticle(title: String!, content: String!): Article`: creates a new article with the specified `title` and `content`. The `author` of the article is determined by the authenticated user.

## Authentication

The server uses HTTP Basic Authentication to authenticate users. To authenticate, the client should include an `Authorization` header with a value of `Basic <base64-encoded-credentials>`, where `base64-encoded-credentials` is the Base64-encoded string of the format `username:password`.

Note that the server only allows authenticated users to create articles. If a user attempts to create an article without being authenticated, the server will return an error with the message "Unauthorized".
You can save this as a .md file and use it for your documentation.
