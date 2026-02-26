Task Management Application

A production-ready full-stack Task Management Application demonstrating backend architecture, authentication, security best practices, database handling, frontend integration, and deployment strategies.

🚀 Objective

Build and deploy a secure and scalable Task Management system that demonstrates:

Clean backend architecture

JWT-based authentication

Strong security practices

Proper database handling

Frontend integration

Production deployment

Live URL: https://task-management-njex.vercel.app/

GitHub Repository: https://github.com/Ravipatelai/Task-Management

Overview

This is a full-stack Task Management Application built to allow users to manage tasks efficiently.

Users can register, login, create, update, delete, search, and filter tasks.

The application demonstrates JWT-based authentication, secure password hashing, proper validation, error handling, and frontend-backend integration.

Tech Stack

Backend: Node.js, Express.js

Frontend: React

Database: MongoDB

Authentication: JWT stored in HTTP-only cookies

Deployment: Vercel

Other: bcrypt (password hashing), dotenv (environment variables)

Features

User Authentication: Registration, Login, Logout

Secure JWT Authentication with HTTP-only cookies

CRUD Operations for Tasks:

Create Task (Title, Description, Status, Created Date)

Read Tasks with Pagination, Status Filter, Title Search

Update Task

Delete Task

Authorization: Users can only access their own tasks

Validation & Error Handling: Input validations and structured error messages

Frontend Protection: Protected routes for logged-in users

Architecture
Frontend (React)
       |
       | HTTP Requests (axios/fetch)
       |
Backend (Node.js + Express)
       |
       | REST APIs with JWT Authentication
       |
Database (MongoDB)
Folder Structure
Task-Management/
│
├── backend/                     
│   ├── config/                  
│   │   └── db.js
│   │   
│   ├── controllers/             
│   │   ├── authController.js
│   │   └── taskController.js
│   │
│   ├── middleware/              
│   │   ├── authMiddleware.js    
│   │   └── errorMiddleware.js   
│   │
│   ├── models/                  
│   │   ├── User.js
│   │   └── Task.js
│   │
│   ├── routes/                  
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   │
│   ├── utils/                   
│   │   └── generateToken.js
│   │
│   ├── .env                     
│   ├── package.json
│   └── server.js                
│
├── frontend/                     
│   ├── public/                   
│   ├── src/
│   │   ├── api/                  
│   │   │   └── axios.js
│   │   │
│   │   ├── components/ 
│   │   │   ├── ProtectedRoutes.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   └── TaskList.jsx
│   │   │
│   │   ├── context/              
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── css/                  
│   │   │   ├── dashboard.css
│   │   │   ├── register.css
│   │   │   ├── login.css
│   │   │   ├── tasks.css
│   │   │   └── taskform.css
│   │   │
│   │   ├── pages/                
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   │
│   │   └── App.jsx               
│   │   └── App.css            
│   │
│   ├── package.json
│   └── vite.config.js             
│
└── README.md                     
🌐 API Documentation (Sample)
Register

POST /api/auth/register

Request:

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "StrongPassword123"
}

Response:

{
  "success": true,
  "message": "User registered successfully"
}
Login

POST /api/auth/login

Response:

{
  "success": true,
  "message": "Login successful"
}

(JWT stored in HTTP-only cookie)

Get Tasks

GET /api/tasks?page=1&limit=10&status=Completed&search=project

Response:

{
  "success": true,
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25
  }
}
Error Handling Format
{
  "success": false,
  "error": "Validation Error",
  "message": "Title is required"
}
Local Setup Instructions
1. Clone Repository
git clone <your-repo-url>
cd Task-Management
2. Install Dependencies
npm install
Backend Setup
cd backend
npm install
Frontend Setup
cd ../frontend
npm install
Environment Variables

Create a .env file in the backend folder:

PORT=5000
MONGO_URI=<your-mongo-db-connection-string>
JWT_SECRET=<your-jwt-secret>
NODE_ENV=development
Run Application
Backend
cd backend
npm run dev
Frontend
cd frontend
npm run dev
🌍 Deployment

Application deployed and publicly accessible

HTTPS enabled

Secure cookie configuration in production

Environment variables configured in cloud provider

Proper CORS configuration
