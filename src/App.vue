<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import BaseLayout from './components/layout/BaseLayout.vue'
import { useTaskStore } from '@/stores/tasks'

const { fetchSavedTasks } = useTaskStore()

onMounted(() => fetchSavedTasks())
</script>

<template>
  <BaseLayout>
    <RouterView />
  </BaseLayout>
</template>
