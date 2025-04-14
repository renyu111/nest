# API Documentation

## Table of Contents
- [Authentication](#authentication)
- [Users](#users)
- [Documents](#documents)

## Authentication

### Register User
```http
POST /auth/register
```

#### Request Body
```json
{
  "username": "string",
  "password": "string",
  "email": "string"
}
```

#### Response
- Status: 200 OK
```json
{
  "id": "number",
  "username": "string",
  "email": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

### Login
```http
POST /auth/login
```

#### Request Body
```json
{
  "username": "string",
  "password": "string"
}
```

#### Response
- Status: 200 OK
```json
{
  "access_token": "string"
}
```

## Users

### Get User Profile
```http
GET /users/profile
```

#### Headers
```
Authorization: Bearer <token>
```

#### Response
- Status: 200 OK
```json
{
  "id": "number",
  "username": "string",
  "email": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

### Update User Profile
```http
PATCH /users/profile
```

#### Headers
```
Authorization: Bearer <token>
```

#### Request Body
```json
{
  "username": "string",
  "email": "string"
}
```

#### Response
- Status: 200 OK
```json
{
  "id": "number",
  "username": "string",
  "email": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

## Documents

### Create Document
```http
POST /documents
```

#### Headers
```
Authorization: Bearer <token>
```

#### Request Body
```json
{
  "title": "string",
  "content": "string",
  "type": "css | html | js | article",
  "language": "string",
  "description": "string",
  "isPublic": "boolean",
  "userId": "number"
}
```

#### Response
- Status: 201 Created
```json
{
  "id": "number",
  "title": "string",
  "content": "string",
  "type": "string",
  "language": "string",
  "description": "string",
  "isPublic": "boolean",
  "userId": "number",
  "createdAt": "date",
  "updatedAt": "date"
}
```

### Get All Documents
```http
GET /documents
```

#### Headers
```
Authorization: Bearer <token>
```

#### Response
- Status: 200 OK
```json
[
  {
    "id": "number",
    "title": "string",
    "content": "string",
    "type": "string",
    "language": "string",
    "description": "string",
    "isPublic": "boolean",
    "userId": "number",
    "createdAt": "date",
    "updatedAt": "date"
  }
]
```

### Get Document by ID
```http
GET /documents/:id
```

#### Headers
```
Authorization: Bearer <token>
```

#### Response
- Status: 200 OK
```json
{
  "id": "number",
  "title": "string",
  "content": "string",
  "type": "string",
  "language": "string",
  "description": "string",
  "isPublic": "boolean",
  "userId": "number",
  "createdAt": "date",
  "updatedAt": "date"
}
```

### Update Document
```http
PATCH /documents/:id
```

#### Headers
```
Authorization: Bearer <token>
```

#### Request Body
```json
{
  "title": "string",
  "content": "string",
  "type": "css | html | js | article",
  "language": "string",
  "description": "string",
  "isPublic": "boolean"
}
```

#### Response
- Status: 200 OK
```json
{
  "id": "number",
  "title": "string",
  "content": "string",
  "type": "string",
  "language": "string",
  "description": "string",
  "isPublic": "boolean",
  "userId": "number",
  "createdAt": "date",
  "updatedAt": "date"
}
```

### Delete Document
```http
DELETE /documents/:id
```

#### Headers
```
Authorization: Bearer <token>
```

#### Response
- Status: 200 OK

### Get Documents by Type
```http
GET /documents/type/:type
```

#### Headers
```
Authorization: Bearer <token>
```

#### Response
- Status: 200 OK
```json
[
  {
    "id": "number",
    "title": "string",
    "content": "string",
    "type": "string",
    "language": "string",
    "description": "string",
    "isPublic": "boolean",
    "userId": "number",
    "createdAt": "date",
    "updatedAt": "date"
  }
]
```

### Get Documents by User
```http
GET /documents/user/:userId
```

#### Headers
```
Authorization: Bearer <token>
```

#### Response
- Status: 200 OK
```json
[
  {
    "id": "number",
    "title": "string",
    "content": "string",
    "type": "string",
    "language": "string",
    "description": "string",
    "isPublic": "boolean",
    "userId": "number",
    "createdAt": "date",
    "updatedAt": "date"
  }
]
```

## Error Responses

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": "string",
  "error": "Bad Request"
}
```

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}
```

### 403 Forbidden
```json
{
  "statusCode": 403,
  "message": "Forbidden resource",
  "error": "Forbidden"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "string",
  "error": "Not Found"
}
```

### 500 Internal Server Error
```json
{
  "statusCode": 500,
  "message": "Internal server error",
  "error": "Internal Server Error"
}
``` 