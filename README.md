# Task Management Application

**Live URL:** [Add your deployed link here]  
**GitHub Repository:** [https://github.com/Ravipatelai/Task-Management]  

---

## Table of Contents
1. [Overview](#overview)  
2. [Tech Stack](#tech-stack)  
3. [Features](#features)  
4. [Architecture](#architecture)  
5. [Setup & Installation](#setup--installation)  
6. [API Endpoints](#api-endpoints)  
7. [Authentication & Security](#authentication--security)  
8. [Deployment](#deployment)  
9. [Screenshots](#screenshots)  
10. [Notes](#notes)  

---

## Overview
This is a **full-stack Task Management Application** built to allow users to manage tasks efficiently.  
Users can **register, login, create, update, delete, search, and filter tasks**.  
The application demonstrates **JWT-based authentication**, **secure password hashing**, proper validation, error handling, and frontend-backend integration.

---

## Tech Stack
- **Backend:** Node.js, Express.js  
- **Frontend:** React / Next.js (update based on your choice)  
- **Database:** MongoDB / PostgreSQL  
- **Authentication:** JWT stored in HTTP-only cookies  
- **Deployment:** Vercel / Render / Railway / AWS / Azure (update your deployed platform)  
- **Other:** bcrypt (password hashing), dotenv (environment variables)  

---

## Features
- **User Authentication:** Registration, Login, Logout  
- **Secure JWT Authentication** with HTTP-only cookies  
- **CRUD Operations for Tasks:**  
  - Create Task (Title, Description, Status, Created Date)  
  - Read Tasks with **Pagination**, **Status Filter**, **Title Search**  
  - Update Task  
  - Delete Task  
- **Authorization:** Users can only access their own tasks  
- **Validation & Error Handling:** Input validations and structured error messages  
- **Frontend Protection:** Protected routes for logged-in users  

---

## Architecture
Frontend (React )
   |
   |  HTTP Requests (axios/fetch)
   |
Backend (Node.js + Express)
   |
   |  REST APIs with JWT Authentication
   |
Database (MongoDB)

## Folder Structure
Task-Management/
│
├── backend/                     # Backend server
│   ├── config/                  # Database models
│   │   └── db.js
│   │   
│   ├── controllers/             # API route handlers
│   │   ├── authController.js
│   │   └── taskController.js
│   │
│   ├── middleware/              # Middleware functions
│   │   ├── authMiddleware.js    # JWT verification & protected routes
│   │   └── errorMiddleware.js   # Global error handler
│   │
│   ├── models/                  # Database models
│   │   ├── User.js
│   │   └── Task.js
│   │
│   ├── routes/                  # Express routes
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   │
│   ├── utils/                   # Utility functions
│   │   └── generateToken.js
│   │
│   ├── .env                     # Environment variables (not committed)
│   ├── package.json
│   └── server.js                # Main entry point
│
├── frontend/                     # Frontend client
│   ├── public/                   # Static assets (images, favicon, etc.)
│   ├── src/
│   │   ├── api/                  # Axios instance or API calls
│   │   │   └── axios.js
│   │   │
│   │   ├── components/ 
│   │   │   ├── ProtectedRoutes.jsx         # Reusable UI components
│   │   │   ├── TaskForm.jsx
│   │   │   └── TaskList.jsx
│   │   │
│   │   ├── context/              # React context for auth/user
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── css/                  # CSS / styling files
│   │   │   ├── dashboard.css
│   │   │   ├── register.css
│   │   │   ├── login.css
│   │   │   ├── tacks.css
│   │   │   └── taskform.css
│   │   │
│   │   ├── pages/                # React/Next.js pages
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   │
│   │   │
│   │   └── App.jsx               # Main React component
│   │   │
│   │   └── App.css            
│   │
│   ├── package.json
│   └── vite.config.js             # Build config
│
└── README.md                     # Project documentation