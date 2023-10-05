<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTaskStore } from '@/stores/tasks'

const taskStore = useTaskStore()
const totalTasks = ref(0)
const completedTasks = ref(0)
const message = ref('')

function updateDisplayedData() {
  totalTasks.value = taskStore.totalTasks
  completedTasks.value = taskStore.completedTasks
  message.value = taskStore.message
}

onMounted(() => {
  updateDisplayedData()
})

taskStore.$subscribe(() => {
  updateDisplayedData()
  taskStore.saveTasks()
})
</script>

<template>
  <div
    class="w-full bg-black border border-[#e5d2c4] rounded-3xl px-12 py-8 flex justify-between items-center"
  >
    <div>
      <div class="text-3xl font-[900]">ToDo Done</div>
      <div>{{ message }}</div>
    </div>
    <div class="bg-orange-600 h-[120px] w-[120px] rounded-full flex justify-center items-center">
      <span class="text-black text-3xl font-[900]">{{ completedTasks }} / {{ totalTasks }}</span>
    </div>
  </div>
</template>
