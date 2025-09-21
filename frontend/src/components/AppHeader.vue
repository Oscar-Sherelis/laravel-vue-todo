<template>
  <v-app-bar color="primary" density="comfortable" elevation="2">
    <v-app-bar-title class="text-h5 font-weight-bold"> 📝 To-Do App </v-app-bar-title>

    <v-spacer />

    <v-btn-toggle
      :model-value="activeTab"
      @update:model-value="handleTabChange"
      color="white"
      variant="outlined"
      divided
      mandatory
    >
      <v-btn value="todo" @click="$emit('tab-change', 'todo')">
        <v-icon left>mdi-format-list-bulleted</v-icon>
        To-Do ({{ todoCount }})
      </v-btn>

      <v-btn value="completed" @click="$emit('tab-change', 'completed')">
        <v-icon left>mdi-check-circle</v-icon>
        Completed ({{ completedCount }})
      </v-btn>
    </v-btn-toggle>
  </v-app-bar>
</template>

<script setup lang="ts">
interface Props {
  activeTab: 'todo' | 'completed'
  todoCount: number
  completedCount: number
}

const handleTabChange = (tab: 'todo' | 'completed') => {
  emit('tab-change', tab)
}

defineProps<Props>()

const emit = defineEmits<{
  'tab-change': [tab: 'todo' | 'completed']
}>()
</script>
