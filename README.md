# 🚀 Real-Time Collaborative Code Editor

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=flat&logo=socket.io&badgeColor=010101)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)

A modern, real-time collaborative code editing environment built with the MERN stack and Socket.io. This platform allows developers to create dedicated project workspaces and write code collaboratively in real time.

## ✨ Features

- **🔐 Secure Authentication:** JWT-based user registration and login system.
- **📁 Workspace Management:** Create, manage, and access multiple code editor projects from a personalized dashboard.
- **⚡ Real-Time Collaboration:** Powered by Socket.io, enabling instantaneous synchronization of code changes across multiple connected clients.
- **🎨 Premium UI/UX:** A stunning, fully responsive dark-mode interface built with Tailwind CSS, featuring glassmorphism elements and smooth micro-animations.
- **🧩 Type-Safe Architecture:** Developed entirely in TypeScript to ensure robust, bug-free, and maintainable code on both the frontend and backend.

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18 with Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Dark Mode first)
- **Routing:** React Router DOM
- **Real-time:** Socket.io-client
- **HTTP Client:** Axios

### Backend
- **Environment:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB via Mongoose
- **Real-time Engine:** Socket.io
- **Security:** JSON Web Tokens (JWT), CORS, Environment variables

## 🚀 Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16+)
- [MongoDB](https://www.mongodb.com/) (Local instance or Atlas URI)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/code-editor.git
cd code-editor
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory and add the following variables:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/code_editor
JWT_SECRET=your_super_secret_jwt_key
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup

Open a new terminal window and navigate to the frontend directory:

```bash
cd my-react-ts
npm install
```

Create a `.env` file in the `my-react-ts` directory:
```env
VITE_BACKEND_URL=http://localhost:3000/api/v1
```

Start the Vite development server:
```bash
npm run dev
```

## 📂 Project Structure

```
.
├── my-react-ts/         # Frontend React Application
│   ├── src/
│   │   ├── api/         # Axios configurations
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # React Router views (Home, Login, Editor)
│   │   └── socket.ts    # Socket.io client instance
│   └── .env.example     # Frontend environment variables template
│
└── server/              # Backend Node/Express Application
    ├── src/
    │   ├── config/      # Database connections
    │   ├── controllers/ # Route logic handlers
    │   ├── middleware/  # JWT & Error handling middleware
    │   ├── models/      # Mongoose schemas
    │   ├── routes/      # Express API routes
    │   └── socket/      # Socket.io event listeners
    └── .env.example     # Backend environment variables template
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/your-username/code-editor/issues).

## 📄 License

This project is [MIT](https://choosealicense.com/licenses/mit/) licensed.
