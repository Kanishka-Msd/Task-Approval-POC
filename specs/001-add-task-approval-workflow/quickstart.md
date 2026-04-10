# Quickstart Guide

## Prerequisites

- Node.js 16 or higher
- MySQL 8.0 or higher
- npm or yarn package manager

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-approval-workflow-poc
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   ```

3. **Set up the frontend**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up the database**
   ```bash
   # Create MySQL database
   mysql -u root -p
   CREATE DATABASE task_approval_workflow;
   \q

   # Run schema
   mysql -u root -p task_approval_workflow < ../database/schema.sql
   ```

5. **Configure environment variables**
   Create `.env` file in backend directory:
   ```env
   PORT=5001
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=task_approval_workflow
   JWT_SECRET=your_jwt_secret_key
   FRONTEND_URL=http://localhost:3000
   ```

## Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```
   Server will start on http://localhost:5001

2. **Start the frontend application**
   ```bash
   cd frontend
   npm start
   ```
   Application will open at http://localhost:3000

## Usage

1. **Create a task**
   - Fill in the task title and description
   - Select an approver username
   - Click "Create Request"

2. **Approve/Reject tasks**
   - Switch to the approver's view by selecting their username
   - Click "Approve" or "Reject" on pending tasks

3. **View task status**
   - Tasks are displayed in a table with current status
   - Filter by user to see relevant tasks

## Development

- **Backend API**: Available at http://localhost:5001/api
- **Database**: MySQL with tables defined in `database/schema.sql`
- **Frontend**: React app with components in `src/components/`

## Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## Troubleshooting

- **Database connection issues**: Verify MySQL is running and credentials are correct
- **Port conflicts**: Change PORT in .env if 5001 is in use
- **CORS errors**: Ensure FRONTEND_URL matches your frontend URL</content>
<parameter name="filePath">/Users/kanish/task-approval-workflow-poc/specs/001-add-task-approval-workflow/quickstart.md