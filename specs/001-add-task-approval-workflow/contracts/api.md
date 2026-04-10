# API Contracts

## Overview

The Task Approval Workflow API provides RESTful endpoints for managing task approval requests. All endpoints return JSON responses and use standard HTTP status codes.

## Authentication

All endpoints require authentication via JWT token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

## Common Response Format

### Success Response
```json
{
  "success": true,
  "data": <response_data>,
  "timestamp": "2026-04-10T12:00:00.000Z"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "timestamp": "2026-04-10T12:00:00.000Z"
}
```

## Endpoints

### GET /api/tasks

Retrieve a list of tasks, optionally filtered by user.

**Query Parameters:**
- `user` (optional): Filter tasks where user is creator or assignee
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of tasks per page (default: 20, max: 100)

**Response:**
```json
{
  "success": true,
  "data": {
    "tasks": [
      {
        "id": 1,
        "title": "Review quarterly report",
        "description": "Please review the Q1 financial report",
        "created_by": "john.doe",
        "assigned_to": "jane.smith",
        "status": "Pending",
        "created_at": "2026-04-10T10:00:00.000Z",
        "updated_at": "2026-04-10T10:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 1,
      "pages": 1
    }
  },
  "timestamp": "2026-04-10T12:00:00.000Z"
}
```

### POST /api/tasks

Create a new task request.

**Request Body:**
```json
{
  "title": "Task title",
  "description": "Task description",
  "created_by": "creator_username",
  "assigned_to": "approver_username"
}
```

**Validation:**
- `title`: Required, string, max 255 characters
- `description`: Optional, string
- `created_by`: Required, string
- `assigned_to`: Required, string

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Task title",
    "description": "Task description",
    "created_by": "creator_username",
    "assigned_to": "approver_username",
    "status": "Pending",
    "created_at": "2026-04-10T12:00:00.000Z",
    "updated_at": "2026-04-10T12:00:00.000Z"
  },
  "timestamp": "2026-04-10T12:00:00.000Z"
}
```

### PUT /api/tasks/:id/status

Update the status of a task (approve or reject).

**Path Parameters:**
- `id`: Task ID (integer)

**Request Body:**
```json
{
  "status": "Approved"
}
```

**Validation:**
- `status`: Must be either "Approved" or "Rejected"
- User must be the assigned approver
- Task must be in "Pending" status

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Task title",
    "description": "Task description",
    "created_by": "creator_username",
    "assigned_to": "approver_username",
    "status": "Approved",
    "created_at": "2026-04-10T10:00:00.000Z",
    "updated_at": "2026-04-10T12:00:00.000Z"
  },
  "timestamp": "2026-04-10T12:00:00.000Z"
}
```

## Error Codes

- `400 Bad Request`: Validation error or invalid request data
- `401 Unauthorized`: Missing or invalid authentication token
- `403 Forbidden`: User not authorized to perform action
- `404 Not Found`: Task not found
- `500 Internal Server Error`: Server error

## Rate Limiting

- 100 requests per 15 minutes per IP address
- Applies to all endpoints

## Real-time Updates

Task status changes are broadcast via WebSocket for real-time UI updates.</content>
<parameter name="filePath">/Users/kanish/task-approval-workflow-poc/specs/001-add-task-approval-workflow/contracts/api.md