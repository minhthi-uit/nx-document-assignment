# Server

This API provides **folder and document management**, **Markdown rendering**, **search**, and **view history tracking**.

When you run `pnpm start:server`, the API is available at:

```bash
http://localhost:4000/api
```

---

## 1. Folder Management API

### **Get All Folders**

Request:

```text
GET /api/folders
```

Sample Response:

```json
[
  {
    "id": "javascript",
    "name": "JavaScript",
    "type": "folder"
  },
  {
    "id": "devops",
    "name": "DevOps",
    "type": "folder"
  }
]
```

### **Get Documents by Folder**

Request:

```text
GET /api/folders/:id
```

Sample Response:

```json
[
  {
    "id": "js-basics",
    "folderId": "javascript",
    "title": "JavaScript Basics",
    "content": "# JavaScript Basics...",
    "createdAt": 1700000000000,
    "updatedAt": 1700000000000
  }
]
```

Errors:

```json
{
  "error": "Folder not found"
}
```

### **Create a New Folder**

Request:

```text
POST /api/folders
```

Request Body:

```json
{
  "name": "Machine Learning"
}
```

Sample Response:

```json
{
  "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "name": "Machine Learning",
  "type": "folder"
}
```

Errors:

```json
{
  "error": "Folder name is required"
}
```

```json
{
  "error": "Folder already exists"
}
```

### **Delete a Folder**

Request:

```text
DELETE /api/folders/:id
```

Sample Response:

```json
{
  "status": "deleted"
}
```

Errors:

```json
{
  "error": "Folder not found"
}
```

---

## 2. Document Management API

### **Get a Document**

Request:

```text
GET /api/documents/:id
```

Sample Response:

```json
{
  "id": "js-basics",
  "folderId": "javascript",
  "title": "JavaScript Basics",
  "content": "# JavaScript Basics...",
  "createdAt": 1700000000000,
  "updatedAt": 1700000000000
}
```

Errors:

```json
{
  "error": "Document not found"
}
```

### **Create a Document**

Request:

```text
POST /api/documents
```

Request Body:

```json
{
  "title": "New Document",
  "content": "# Markdown content",
  "folderId": "javascript"
}
```

Sample Response:

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "folderId": "javascript",
  "title": "New Document",
  "content": "# Markdown content",
  "createdAt": 1700000000000,
  "updatedAt": 1700000000000
}
```

Errors:

```json
{
  "error": "Folder not found"
}
```

```json
{
  "error": "Title, content, and folderId are required"
}
```

### **Update a Document**

Request:

```text
PATCH /api/documents/:id
```

Request Body:

```json
{
  "content": "# Updated Markdown content"
}
```

Sample Response:

```json
{
  "id": "js-basics",
  "folderId": "javascript",
  "title": "JavaScript Basics",
  "content": "# Updated Markdown content",
  "createdAt": 1700000000000,
  "updatedAt": 1700000005000
}
```

Errors:

```json
{
  "error": "Invalid document ID"
}
```

```json
{
  "error": "Content is required"
}
```

```json
{
  "error": "Document not found"
}
```

### **Delete a Document**

Request:

```text
DELETE /api/documents/:id
```

Sample Response:

```json
{
  "status": "deleted"
}
```

Errors:

```json
{
  "error": "Document not found"
}
```

---

## 3. Search API

### **Search for Documents**

Request:

```text
GET /api/search?query=keyword
```

Sample Response:

```json
[
  {
    "id": "docker-basics",
    "title": "Docker Basics",
    "snippet": "# Docker Basics\n\n## Install Docker..."
  }
]
```

---

## 4. History API

### **Get View History**

Request:

```text
GET /api/history
```

Sample Response:

```json
[
  {
    "id": "js-basics",
    "title": "JavaScript Basics",
    "timestamp": 1700000000000
  }
]
```

### **Add a Document to History**

Request:

```text
POST /api/history
```

Request Body:

```json
{
  "id": "js-basics",
  "title": "JavaScript Basics"
}
```

Sample Response:

```json
{
  "status": "added"
}
```

---

# Summary of API Endpoints

| **API Type**  | **Method** | **Endpoint**                | **Description**              |
| ------------- | ---------- | --------------------------- | ---------------------------- |
| **Folders**   | `GET`      | `/api/folders`              | Get all folders              |
| **Folders**   | `GET`      | `/api/folders/:id`          | Get all documents in folder  |
| **Folders**   | `POST`     | `/api/folders`              | Create a folder              |
| **Folders**   | `DELETE`   | `/api/folders/:id`          | Delete a folder              |
| **Documents** | `GET`      | `/api/documents/:id`        | Get document content         |
| **Documents** | `POST`     | `/api/documents`            | Create a new document        |
| **Documents** | `PATCH`    | `/api/documents/:id`        | Update document content      |
| **Documents** | `DELETE`   | `/api/documents/:id`        | Delete a document            |
| **Search**    | `GET`      | `/api/search?query=keyword` | Search for documents         |
| **History**   | `GET`      | `/api/history`              | Get viewed documents history |
| **History**   | `POST`     | `/api/history`              | Add document to history      |
