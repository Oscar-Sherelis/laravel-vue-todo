<template>
  <v-card class="mb-6" elevation="2">
    <v-card-title class="text-h6">
      <v-icon left color="primary">mdi-plus</v-icon>
      Add New Task
    </v-card-title>

    <v-card-text>
      <v-form @submit.prevent="handleSubmit" ref="form">
        <v-text-field
          v-model="title"
          label="Task Title"
          variant="outlined"
          :rules="titleRules"
          required
          class="mb-3"
        />

        <v-textarea
          v-model="description"
          label="Description (optional)"
          variant="outlined"
          rows="3"
          class="mb-3"
        />

        <v-btn type="submit" color="primary" :loading="loading" size="large">
          <v-icon left>mdi-plus</v-icon>
          Add Task
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  loading?: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  submit: [data: { title: string; description: string }]
}>()

const form = ref()
const title = ref('')
const description = ref('')

const titleRules = [
  (v: string) => !!v || 'Title is required',
  (v: string) => v.length >= 3 || 'Title must be at least 3 characters',
]

const handleSubmit = async () => {
  const { valid } = await form.value.validate()

  if (valid) {
    emit('submit', {
      title: title.value,
      description: description.value,
    })

    title.value = ''
    description.value = ''
    form.value.reset()
  }
}
</script>
