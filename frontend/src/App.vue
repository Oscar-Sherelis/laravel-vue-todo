<template>
  <v-app>
    <AppHeader
      :active-tab="activeTab"
      :todo-count="tasksStore.todoTasks.length"
      :completed-count="tasksStore.completedTasks.length"
      @tab-change="handleTabChange"
    />

    <v-main class="bg-grey-lighten-4">
      <v-container class="py-6">
        <TaskForm
          v-if="activeTab === 'todo'"
          :loading="tasksStore.loading"
          @submit="handleCreateTask"
        />

        <v-card v-if="tasksStore.loading && currentTasks.length === 0" class="text-center pa-8">
          <v-progress-circular indeterminate color="primary" size="50" />
          <p class="text-body-1 mt-4 mb-0">Loading tasks...</p>
        </v-card>

        <v-alert
          v-if="tasksStore.error"
          type="error"
          variant="outlined"
          closable
          @click:close="tasksStore.clearError()"
          class="mb-4"
        >
          {{ tasksStore.error }}
        </v-alert>

        <TaskList
          v-if="!tasksStore.loading || currentTasks.length > 0"
          :tasks="currentTasks"
          :type="activeTab"
          @toggle="handleToggleTask"
          @delete="handleDeleteTask"
        />
      </v-container>
    </v-main>

    <v-overlay
      v-model="tasksStore.loading"
      class="align-center justify-center"
      contained
      persistent
    >
      <v-progress-circular
        indeterminate
        color="primary"
        size="50"
      />
    </v-overlay>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useTasksStore } from '@/stores/tasks'
import AppHeader from '@/components/AppHeader.vue'
import TaskForm from '@/components/TaskForm.vue'
import TaskList from '@/components/TaskList.vue'

const tasksStore = useTasksStore()
const activeTab = ref<'todo' | 'completed'>('todo')

const currentTasks = computed(() => 
  activeTab.value === 'todo' ? tasksStore.todoTasks : tasksStore.completedTasks
)

const handleTabChange = async (tab: 'todo' | 'completed') => {
  activeTab.value = tab
  await tasksStore.fetchTasks(tab === 'completed')
}

const handleCreateTask = async (taskData: { title: string; description: string }) => {
  await tasksStore.createTask(taskData)
}

const handleToggleTask = async (taskId: number) => {
  await tasksStore.toggleTask(taskId)
}

const handleDeleteTask = async (taskId: number) => {
  await tasksStore.deleteTask(taskId)
}

onMounted(async () => {
  await tasksStore.fetchTasks(false)
})
</script>

<style scoped>
.v-main {
  min-height: 100vh;
}
</style>