const API_BASE = 'http://localhost:5001/api';

async function apiRequest(url, options = {}) {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

export async function createTask(payload) {
  return apiRequest(`${API_BASE}/tasks`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function fetchTasks(user) {
  const url = user
    ? `${API_BASE}/tasks?user=${encodeURIComponent(user)}`
    : `${API_BASE}/tasks`;

  return apiRequest(url);
}

export async function updateTaskStatus(id, status) {
  return apiRequest(`${API_BASE}/tasks/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
}
