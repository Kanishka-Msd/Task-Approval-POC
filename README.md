# 🚀 Task Approval Workflow POC

A full-stack Proof of Concept (POC) for a **Task Approval Workflow System** built using **React, Node.js, and MySQL**.

This application allows users to create tasks, assign them to approvers, and manage approvals with real-time status updates.

---

## 📌 Features

- Create task requests  
- Assign tasks to users  
- View all tasks  
- Approve or reject tasks  
- Track task status (Pending / Approved / Rejected)  
- Filter tasks by user  
- End-to-end integration (Frontend → Backend → Database)

---

## 🏗️ Architecture

The application follows a **3-tier architecture**:
Frontend (React) → Backend (Node.js / Express) → Database (MySQL)


- Frontend handles UI and user interactions  
- Backend handles APIs and business logic  
- Database stores task data  

---

## 🧠 Workflow

1. User creates a task from UI  
2. Frontend sends POST request to backend  
3. Backend validates and stores data in MySQL  
4. Tasks are fetched and displayed in UI  
5. Approver clicks Approve/Reject  
6. Backend updates task status  
7. UI refreshes with updated status  

---

## 🛠️ Tech Stack

### Frontend
- React
- JavaScript (ES6)
- CSS

### Backend
- Node.js
- Express.js
- MySQL2
- CORS
- dotenv

### Database
- MySQL

---

## 📂 Project Structure

task-approval-workflow-poc/
├── frontend/ # React app
├── backend/ # Node.js APIs
├── database/ # SQL schema
├── specs/ # Spec Kit docs
└── README.md


---

## ⚙️ Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/Kanishka-Msd/Task-Approval-POC.git
cd Task-Approval-POC

2. Backend Setup
cd backend
npm install

Create a .env file:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=your_database
PORT=5001

Start backend:
npm run dev

3. Database Setup
CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  created_by VARCHAR(100),
  assigned_to VARCHAR(100),
  status ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

4. Frontend Setup
cd frontend
npm install
npm start

Frontend runs on:
👉 http://localhost:3000

Backend runs on:
👉 http://localhost:5001

| Method | Endpoint              | Description   |
| ------ | --------------------- | ------------- |
| POST   | /api/tasks            | Create task   |
| GET    | /api/tasks            | Fetch tasks   |
| PUT    | /api/tasks/:id/status | Update status |

Testing APIs

curl http://localhost:5001/api/tasks

curl -X POST http://localhost:5001/api/tasks \
-H "Content-Type: application/json" \
-d '{"title":"Test","description":"Demo","created_by":"User","assigned_to":"Approver"}'

curl -X PUT http://localhost:5001/api/tasks/1/status \
-H "Content-Type: application/json" \
-d '{"status":"Approved"}'

Spec Kit Usage
Used to break down requirements into structured user stories and tasks
Helped guide development in a step-by-step manner

Future Improvements
Add authentication (JWT)
Role-based access (creator vs approver)
Notifications for approvals
UI improvements
Pagination and search


---

# 🎯 What you do now

1. Open `README.md` in VS Code  
2. **Replace everything** with this  
3. Save  
4. Run:

```bash
git add README.md
git commit -m "Clean formatted README"
git push