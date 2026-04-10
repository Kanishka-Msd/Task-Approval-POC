# Data Model

## Entities

### Task

**Description**: Represents an approval request in the workflow system.

**Fields:**

- `id`: INTEGER PRIMARY KEY AUTOINCREMENT - Unique identifier for the task
- `title`: TEXT NOT NULL - Brief title of the task request
- `description`: TEXT - Detailed description of the task (optional)
- `created_by`: TEXT NOT NULL - Identifier of the user who created the task
- `assigned_to`: TEXT NOT NULL - Identifier of the user assigned to approve/reject the task
- `status`: TEXT NOT NULL DEFAULT 'Pending' - Current status of the task
- `created_at`: DATETIME DEFAULT CURRENT_TIMESTAMP - When the task was created
- `updated_at`: DATETIME DEFAULT CURRENT_TIMESTAMP - When the task was last modified

**Validation Rules:**

- `title`: Required, non-empty string, maximum 255 characters
- `description`: Optional, text field with no specific length limit
- `created_by`: Required, valid user identifier (string)
- `assigned_to`: Required, valid user identifier (string), cannot be empty
- `status`: Must be one of: 'Pending', 'Approved', 'Rejected'

**Relationships:**

- No direct foreign key relationships (users represented by identifiers only)

**State Transitions:**

- `Pending` → `Approved` (when assigned user approves)
- `Pending` → `Rejected` (when assigned user rejects)
- No other transitions allowed (approved/rejected tasks are final)

**Business Rules:**

- A user cannot approve their own tasks (segregation of duties)
- Only the assigned user can change the task status
- Task status changes should be logged for audit purposes
- Tasks cannot be deleted once created (immutable history)

**Indexes:**

- Primary key on `id`
- Index on `status` for filtering by status
- Index on `assigned_to` for finding tasks assigned to a user
- Index on `created_by` for finding tasks created by a user
- Index on `created_at` for chronological ordering</content>
<parameter name="filePath">/Users/kanish/task-approval-workflow-poc/specs/001-add-task-approval-workflow/data-model.md