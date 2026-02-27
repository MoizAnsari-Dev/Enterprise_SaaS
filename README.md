<div align="center">
  <img src="https://github.com/user-attachments/assets/eb6176b1-3516-4e11-a313-49de53f809dc" alt="Luminary Journal Banner" width="100%" style="border-radius: 12px; margin-bottom: 20px;">
  
  <h1 align="center">✨ Luminary Journal ✨</h1>
  <p align="center">
    <strong>A seamless, distraction-free personal journaling platform inspired by Notion.</strong>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Stack-MEAN-green.svg?style=for-the-badge&logo=mongodb" alt="MEAN Stack" />
    <img src="https://img.shields.io/badge/Frontend-Angular_15-dd0031.svg?style=for-the-badge&logo=angular" alt="Angular" />
    <img src="https://img.shields.io/badge/Backend-Node_&_Express-339933.svg?style=for-the-badge&logo=nodedotjs" alt="Node" />
    <img src="https://img.shields.io/badge/Proxy-Nginx-009639.svg?style=for-the-badge&logo=nginx" alt="Nginx" />
    <img src="https://img.shields.io/badge/Container-Docker-2496ED.svg?style=for-the-badge&logo=docker" alt="Docker" />
  </p>
</div>

---

## 📖 What is Luminary?

Originally a CRUD application for coding tutorials, this project has been completely overhauled into a **minimalist personal journal**. It focuses on an edge-to-edge blank canvas writing environment, offering automated intelligence to organize your private entries while looking stunning. 

It is fully containerized with **Docker** and uses **Nginx** as a reverse proxy, making it a production-ready template that can be integrated directly into CI/CD pipelines.

---

## 🚀 Key Features

- **📝 Notion-Style Editor Canvas**
  - Experience distraction-free writing! The "New Entry" screen mimics Notion’s edge-to-edge blank page with gorgeous typography, borderless inputs, and soft ghost-text placeholders.
- **🔒 Private Journal Locking Mechanism**
  - Instead of "publishing" entries, Luminary natively acts as a private draft board. When an entry is finished, click the `Lock` pad-lock to vault it.
- **🧠 Auto AI-Powered Tagging**
  - Titles are scanned logically. An entry named "My Work Ideas" gets automatically categorized under `Work` and `Ideas` tags directly on the dashboard.
- **⭐ 5-Star Interactive Rating System**
  - Want to remember a specific day? Instantly rank your entries from 0 to 5 stars via hovering icon interactions directly from the list view without reloading.
- **📊 Real-Time Word Count Tracking**
  - A sleek floating widget instantly counts and updates your word count as you type your thoughts onto the canvas.
- **🌗 Built-In Dark Mode & Glassmorphism UI**
  - Beautiful, dynamic Shadden/Vercel-inspired tab layouts with smooth animations, custom scrollbars, and instant dark-mode toggling.

---

## 🏗️ Architecture & Infrastructure

- **Frontend:** Angular 15 Client with custom raw CSS
- **Backend:** Node.js & Express REST API using Mongoose
- **Database:** MongoDB configured natively with Mongoose v7 optimizations
- **Proxy:** Nginx safely handles internal traffic, routing `/api/*` requests identically.
- **CI/CD:** Jenkins declarative pipeline pushing into Docker Hub automatically.

---

## ⚙️ Setup & Deployment

### 1. Environment Configuration (.env)
The application expects environment variables to securely connect to the database. Create a file named `.env` in the `/backend` folder.
```env
# /backend/.env
DB_URL=mongodb://192.168.49.2:30017/mydatabase
PORT=8080
```
> *(A `.env.example` file is included in the repo!)*

### Option A: Using Docker Compose (Recommended)
The absolute easiest way to run the entire application natively.
```bash
# Clone the repository
git clone https://github.com/MoizAnsari-Dev/crud-dd-task-mean-app.git
cd crud-dd-task-mean-app

# Run the stack
docker-compose up -d --build
```
> **UI Access:** `http://localhost/`  
> **API Access:** `http://localhost/api/tutorials` (Routed seamlessly by Nginx)

### Option B: Running Locally (Development Mode)
If you want to edit the code live:

1. **Start a local MongoDB container:**
   ```bash
   docker run -d -p 27017:27017 --name mongodb-server mongo:latest
   ```
2. **Start the Backend:**
   ```bash
   cd backend
   npm install
   node server.js
   ```
3. **Start the Frontend:**
   ```bash
   cd frontend
   npm install
   npx ng serve --port 8081
   ```

---

## 🔄 CI/CD Automation (Jenkins)

This repository includes a `Jenkinsfile` that implements a complete Jenkins Pipeline:
1. **Checkout:** Pulls latest code from the `main` branch.
2. **Build:** Uses Docker Compose to build the new Frontend/Backend images.
3. **Push:** Logs into Docker Hub using standard credentials and pushes the securely built containers.
4. **Deploy:** Reaches out to the target Virtual Machine via SSH, pulls the refreshed images, and intelligently restarts the ecosystem.

---

<p align="center">
  <i>Built with modern aesthetic passion.</i>
</p>
