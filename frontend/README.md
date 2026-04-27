🚀 Task Approval Workflow POC

A full-stack Proof of Concept (POC) for a Task Approval Workflow System built using React, Node.js, and MySQL.

This application allows users to create tasks, assign them to approvers, and manage approvals with status tracking.

📌 Features
Create task requests
Assign tasks to users
View all tasks
Approve or reject tasks
Track task status (Pending / Approved / Rejected)
End-to-end integration (Frontend → Backend → Database)
🏗️ Architecture

Frontend (React) → Backend (Node.js / Express) → Database (MySQL)

🧠 Workflow
User creates a task from UI
Frontend sends request to backend
Backend stores data in MySQL
Tasks are fetched and shown in UI
Approver updates status
Backend updates DB
UI refreshes with new status
🛠️ Tech Stack

Frontend

React
JavaScript

Backend

Node.js
Express.js

Database

MySQL
📂 Project Structure
task-approval-workflow-poc/
├── frontend/
├── backend/
├── database/
├── specs/
└── README.md
⚙️ Setup Instructions
Clone Repo
git clone https://github.com/Kanishka-Msd/Task-Approval-POC.git
cd Task-Approval-POC
Backend Setup
cd backend
npm install
npm run dev
Frontend Setup
cd frontend
npm install
npm start
🔌 API Endpoints
POST /api/tasks → Create task
GET /api/tasks → Fetch tasks
PUT /api/tasks/:id/status → Update status
🧪 Testing
curl http://localhost:5001/api/tasks
🧩 Spec Kit Usage
Used to define project structure and tasks
Helped in organizing development flow