<script setup lang="ts">
import TaskItem from './TaskItem.vue'
const tasks = ['task 1', 'task 2', 'task 3']
</script>

<template>
  <div>
    <TaskItem v-for="(task, index) in tasks" :key="index" :text="task" />
  </div>
</template>
