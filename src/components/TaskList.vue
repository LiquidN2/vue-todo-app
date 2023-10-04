<script setup lang="ts">
import { useTaskStore } from '@/stores/tasks'
import TaskItem from './TaskItem.vue'

const { tasks } = useTaskStore()
</script>

<template>
  <div class="w-full h-[300px] mb-5 overflow-auto">
    <TaskItem v-for="{ id, text } in tasks" :key="id" :text="text" :id="id" />
  </div>
</template>

<style lang="scss" scoped>
div {
  & > *:not(:last-child) {
    margin-bottom: 20px;
  }
}
</style>
