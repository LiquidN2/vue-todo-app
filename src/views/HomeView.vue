<script setup lang="ts">
import ResultUpdate from '@/components/ResultUpdate.vue'
import TaskInput from '@/components/TaskInput.vue'
import TaskList from '@/components/TaskList.vue'
</script>

<template>
  <main class="w-full flex-grow">
    <div class="max-w-md h-full mx-auto my-0 flex flex-col justify-between items-center">
      <ResultUpdate />
      <TaskInput />
      <TaskList />
    </div>
  </main>
</template>
