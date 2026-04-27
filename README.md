# Task-Approval-POC
🚀 Task Approval Workflow POC

A full-stack Proof of Concept (POC) for a Task Approval Workflow System built using React, Node.js, and MySQL.
This application allows users to create tasks, assign them to approvers, and manage approvals with real-time status updates.

📌 Features
Create task requests
Assign tasks to users
View all tasks
Approve or reject tasks
Track task status (Pending / Approved / Rejected)
Filter tasks by user
End-to-end integration (Frontend → Backend → Database)
🏗️ Architecture

The application follows a 3-tier architecture:

Frontend (React) → Backend (Node.js / Express) → Database (MySQL)
Frontend handles UI and user interactions
Backend handles APIs and business logic
Database stores task data
🧠 Workflow
User creates a task from the UI
Frontend sends a POST request to backend
Backend validates and stores data in MySQL
Tasks are fetched and displayed in UI
Approver clicks Approve/Reject
Backend updates task status
UI refreshes with updated status
🛠️ Tech Stack
Frontend
React
JavaScript (ES6)
CSS
Backend
Node.js
Express.js
MySQL2
CORS
dotenv
Database
MySQL
📂 Project Structure
task-approval-workflow-poc/
│
├── frontend/        # React application
├── backend/         # Node.js + Express APIs
├── database/        # SQL schema
├── specs/           # Spec Kit generated docs
└── README.md
⚙️ Setup Instructions
1. Clone Repository
git clone https://github.com/Kanishka-Msd/Task-Approval-POC.git
cd Task-Approval-POC
2. Setup Backend
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
3. Setup Database

Create database and run:

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  created_by VARCHAR(100),
  assigned_to VARCHAR(100),
  status ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
4. Setup Frontend
cd frontend
npm install
npm start

Frontend runs on:

http://localhost:3000

Backend runs on:

http://localhost:5001
🔌 API Endpoints
Create Task
POST /api/tasks
Get Tasks
GET /api/tasks
Update Task Status
PUT /api/tasks/:id/status
🧪 Testing

You can test APIs using curl:

curl http://localhost:5001/api/tasks
curl -X POST http://localhost:5001/api/tasks \
-H "Content-Type: application/json" \
-d '{"title":"Test","description":"Demo","created_by":"User","assigned_to":"Approver"}'
curl -X PUT http://localhost:5001/api/tasks/1/status \
-H "Content-Type: application/json" \
-d '{"status":"Approved"}'
🧩 Role of Spec Kit
Used to break down requirements into structured user stories and tasks
Helped guide development in a step-by-step manner
🚀 Future Improvements
Add authentication (JWT)
Role-based access (creator vs approver)
Notifications for approvals
UI enhancements
Pagination and search improvements
✅ Status