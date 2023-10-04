<script setup lang="ts">
import { ref } from 'vue'
import { useTaskStore } from '@/stores/tasks'

const task = ref('')
const { addTask } = useTaskStore()
const onSubmit = () => {
  if (!task.value) return
  addTask(task.value)
  task.value = ''
}
</script>

<template>
  <form class="w-full flex flex-row justify-between items-center`" @submit.prevent="onSubmit">
    <input
      type="text"
      name="task"
      id="task"
      class="flex-grow bg-stone-900 rounded-[15px] px-4 py-3 placeholder:text-[#e5d2c4] placeholder:opacity-40 focus:outline-0"
      placeholder="write your next task"
      v-model="task"
      required
    />
    <button
      class="ml-5 bg-orange-600 rounded-full h-[50px] w-[50px] flex justify-center items-center"
    >
      <span class="text-black text-2xl font-[900]">+</span>
    </button>
  </form>
</template>
