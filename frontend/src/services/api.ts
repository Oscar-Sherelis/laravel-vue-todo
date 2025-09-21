const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

export interface Task {
  id: number
  title: string
  description: string | null
  is_completed: boolean
  created_at: string
  updated_at: string
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  async getTasks(completed: boolean = false): Promise<ApiResponse<Task[]>> {
    return this.request<ApiResponse<Task[]>>(`/tasks?completed=${completed}`)
  }

  async createTask(
    task: Omit<Task, 'id' | 'is_completed' | 'created_at' | 'updated_at'>,
  ): Promise<ApiResponse<Task>> {
    return this.request<ApiResponse<Task>>('/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    })
  }

  async updateTask(id: number, task: Partial<Task>): Promise<ApiResponse<Task>> {
    return this.request<ApiResponse<Task>>(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(task),
    })
  }

  async deleteTask(id: number): Promise<ApiResponse<null>> {
    return this.request<ApiResponse<null>>(`/tasks/${id}`, {
      method: 'DELETE',
    })
  }

  async toggleTask(id: number): Promise<ApiResponse<Task>> {
    return this.request<ApiResponse<Task>>(`/tasks/${id}/toggle`, {
      method: 'PATCH',
    })
  }
}

export const apiService = new ApiService()
