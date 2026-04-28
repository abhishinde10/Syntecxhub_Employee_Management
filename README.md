# Employee Management System

A full-stack MERN application for managing employees. Built with React (Vite), Node.js, Express, and MongoDB.

## Features

- **Add Employee:** Create a new employee record with name, role, and salary.
- **View Employees:** Display all employees in a responsive card layout.
- **Edit Employee:** Update an existing employee's details.
- **Delete Employee:** Remove an employee from the directory.
- **Modern UI:** Clean, glassmorphism-inspired design with fully responsive CSS.

## Tech Stack

- **Frontend:** React, Vite, standard CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose)
- **Deployment:** Render (Backend), Vercel (Frontend)

## Local Setup Instructions

### 1. Backend Setup
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder and add your MongoDB connection string and port:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string_here
   NODE_ENV=development
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. The `.env` file is already created with `VITE_API_URL=http://localhost:5000`. If you change the backend port, update it here.
4. Start the frontend development server:
   ```bash
   npm run dev
   ```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/employees` | Fetch all employees |
| `POST` | `/api/employees` | Add a new employee |
| `PUT` | `/api/employees/:id` | Update an existing employee |
| `DELETE` | `/api/employees/:id` | Delete an employee |

## Deployment Guide

### Backend Deployment (Render)
1. Push your code to a GitHub repository named `Syntecxhub_Employee_Management`.
2. Log in to [Render](https://render.com/) and create a new **Web Service**.
3. Connect your GitHub repository.
4. Set the Root Directory to `backend`.
5. Set the Build Command to `npm install`.
6. Set the Start Command to `node server.js`.
7. Add Environment Variables:
   - `MONGO_URI`: Your MongoDB Atlas connection string.
   - `NODE_ENV`: `production`.
8. Click **Deploy**. Copy the live API URL once finished.

### Frontend Deployment (Vercel)
1. Log in to [Vercel](https://vercel.com/) and add a **New Project**.
2. Connect the same GitHub repository.
3. Set the Root Directory to `frontend`.
4. Ensure the Framework Preset is set to **Vite**.
5. Add an Environment Variable:
   - `VITE_API_URL`: The live API URL you copied from Render (e.g., `https://your-backend.onrender.com`).
6. Click **Deploy**.
