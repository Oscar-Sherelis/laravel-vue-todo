import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { apiService, type Task } from '@/services/api'

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Computed
  const todoTasks = computed(() => tasks.value.filter((task) => !task.is_completed))

  const completedTasks = computed(() => tasks.value.filter((task) => task.is_completed))

  // Actions
  async function fetchTasks(completed: boolean = false) {
    loading.value = true
    error.value = null

    try {
      const response = await apiService.getTasks(completed)

      if (completed) {
        // Replace completed tasks
        tasks.value = tasks.value.filter((t) => !t.is_completed).concat(response.data)
      } else {
        // Replace todo tasks
        tasks.value = tasks.value.filter((t) => t.is_completed).concat(response.data)
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch tasks'
    } finally {
      loading.value = false
    }
  }

  async function createTask(taskData: { title: string; description?: string }) {
    loading.value = true
    error.value = null

    try {
      const response = await apiService.createTask(taskData)
      tasks.value.unshift(response.data)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create task'
    } finally {
      loading.value = false
    }
  }

  async function toggleTask(taskId: number) {
    loading.value = true
    error.value = null

    try {
      const response = await apiService.toggleTask(taskId)

      const index = tasks.value.findIndex((t) => t.id === taskId)
      if (index !== -1) {
        tasks.value[index] = response.data
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to toggle task'
    } finally {
      loading.value = false
    }
  }

  async function deleteTask(taskId: number) {
    loading.value = true
    error.value = null

    try {
      await apiService.deleteTask(taskId)
      tasks.value = tasks.value.filter((t) => t.id !== taskId)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete task'
    } finally {
      loading.value = false
    }
  }

  function clearError() {
    error.value = null
  }

  return {
    // State
    tasks,
    loading,
    error,

    // Computed
    todoTasks,
    completedTasks,

    // Actions
    fetchTasks,
    createTask,
    toggleTask,
    deleteTask,
    clearError,
  }
})
