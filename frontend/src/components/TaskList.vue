<template>
  <div>
    <v-fade-transition group>
      <v-card
        v-for="task in tasks"
        :key="task.id"
        class="mb-3"
        elevation="1"
        :class="{ 'opacity-60': task.is_completed }"
      >
        <v-card-text class="d-flex align-center">
          <v-checkbox
            :model-value="task.is_completed"
            @update:model-value="$emit('toggle', task.id)"
            color="success"
            class="mr-3"
          />
          
          <div class="flex-grow-1">
            <h3 
              class="text-subtitle-1 font-weight-medium"
              :class="{ 'text-decoration-line-through': task.is_completed }"
            >
              {{ task.title }}
            </h3>
            <p 
              v-if="task.description" 
              class="text-body-2 text-medium-emphasis mt-1 mb-0"
              :class="{ 'text-decoration-line-through': task.is_completed }"
            >
              {{ task.description }}
            </p>
            <small class="text-caption text-medium-emphasis">
              Created: {{ formatDate(task.created_at) }}
            </small>
          </div>
          
          <v-btn
            icon="mdi-delete"
            color="error"
            variant="text"
            size="small"
            @click="$emit('delete', task.id)"
          />
        </v-card-text>
      </v-card>
    </v-fade-transition>
    
    <v-card
      v-if="tasks.length === 0"
      class="text-center pa-8"
      variant="outlined"
    >
      <v-icon 
        size="64" 
        color="grey-lighten-1"
        :icon="emptyIcon"
        class="mb-4"
      />
      <h3 class="text-h6 text-medium-emphasis">{{ emptyMessage }}</h3>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Task } from '@/services/api'

interface Props {
  tasks: Task[]
  type: 'todo' | 'completed'
}

const props = defineProps<Props>()

defineEmits<{
  toggle: [taskId: number]
  delete: [taskId: number]
}>()

const emptyIcon = computed(() => 
  props.type === 'todo' ? 'mdi-clipboard-text-outline' : 'mdi-check-circle-outline'
)

const emptyMessage = computed(() => 
  props.type === 'todo' 
    ? 'No tasks to do. Add a new task above!' 
    : 'No completed tasks yet. Complete some tasks to see them here!'
)

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>