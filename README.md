# Next.js Todo List with User Authentication

## Project Overview
This is a full-stack web application built with Next.js that combines task management with user authentication and profile management. Users can create accounts, manage their todos, and maintain their profile information.

## Key Features

### Authentication
- Secure user registration and login system
- Protected routes and API endpoints
- Session management using NextAuth.js
- Password encryption and secure authentication

### Todo Management
- Create, read, update, and delete todos
- Organize todos by status:
  - Todo
  - In Progress
  - Review
  - Done
- Drag and drop functionality for status updates
- Real-time updates

### Profile Management
- View and update user profile information
- Secure password verification for profile updates
- Manage personal details (name, last name)
- Profile data persistence

## Technical Stack
- **Frontend**: Next.js, React
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **State Management**: React Hooks
- **Styling**: CSS Modules
- **Toast Notifications**: React Toastify

## Project Structure

project/
├── components/
│ ├── module/ // Reusable components
│ │ ├── ProfileForm.js
│ │ ├── ProfileData.js
│ │ └── Tasks.js
│ └── templates/ // Page templates
│ ├── HomePage.js
│ ├── LoginPage.js
│ ├── AddTodo.js
│ └── ProfilePage.js
├── pages/
│ ├── api/ // API routes
│ │ ├── auth/
│ │ ├── todos.js
│ │ └── profile.js
│ ├── index.js
│ ├── signin.js
│ ├── signup.js
│ ├── profile.js
│ └── add-todo.js
├── models/ // Database models
│ └── User.js
└── utils/ // Utility functions
├── auth.js
└── connectDB.js

## Getting Started
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables:
   - MongoDB connection string
   - NextAuth secret
4. Run the development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000)

## Features in Detail

### User Authentication
- Secure registration with email and password
- Protected routes requiring authentication
- Session-based authentication using NextAuth.js

### Todo Management
- Create new todos with title and status
- Update todo status through drag-and-drop interface
- Organize todos in different stages of completion
- Real-time updates when todos are modified

### Profile Management
- View and edit profile information
- Secure password verification for updates
- Maintain user details (name, last name)
- Responsive profile interface

This project demonstrates a complete full-stack application with modern web development practices, including secure authentication, database integration, and responsive user interface design.
