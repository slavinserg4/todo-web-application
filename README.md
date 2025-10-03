# Task Management Application

A full-stack task management application built with modern technologies, featuring real-time updates, task filtering, and responsive design.

## Technologies Used

### Backend

- Node.js with Express.js (v5.1.0)
- MongoDB with Mongoose (v8.18.1)
- TypeScript
- JWT for authentication
- Joi for validation
- Docker for containerization

### Frontend

- Next.js 15.5.4 with App Router
- React 19.1.0
- TypeScript
- Server Actions
- TailwindCSS

## Features

- Create, Read, Update, and Delete tasks
- Task filtering and sorting
- Real-time updates
- Responsive design
- Server-side validation
- Pagination
- Search functionality
- Priority levels
- Due dates
- Task categories

## Prerequisites

- Node.js (v20 or higher)
- Docker and Docker Compose
- npm or yarn package manager

## Installation & Setup

1. Clone the repository

2. Create the `.env` and `.env.db` files in the root directory using the provided examples or environment variable documentation.
```
PORT={your port}
MONGO_URI=mongodb://user:user@db:27017/todo-db?authSource=admin
or 
MONGO_URI=mongodb+srv://user:user@cluster0.vsvnxyt.mongodb.net/
It is the cloud db without db service in docker-compose.yml
```
3. Navigate to the backend/ folder and install dependencies:
```
cd backend/
npm install
```
4. Build and start the application using Docker:
```
docker compose up --build
```

Wait until the backend starts. You should see the message:
`Database available!!! Server listening on {your port}`


Open your browser and test the application at
- http://localhost

or
- http://localhost:80