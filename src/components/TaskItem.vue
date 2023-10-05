<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

import { useTaskStore } from '@/stores/tasks'

const props = defineProps(['id', 'text'])

const inputValue = ref<string>(props.text)
const inputDisabled = ref(true)
const inputRef = ref(null)
const { deleteTask, updateTask } = useTaskStore()

function handleEdit() {
  inputDisabled.value = false
}

onClickOutside(inputRef, () => {
  inputDisabled.value = true
  updateTask(props.id, { text: inputValue.value })
})
</script>

<template>
  <div
    class="flex justify-between bg-stone-900 text-[#e5d2c4] border-[1px] border-[#e5d2c4] rounded-lg px-6 py-3"
  >
    <input type="text" :disabled="inputDisabled" ref="inputRef" v-model="inputValue" />
    <div>
      <button class="mr-2" @click="handleEdit">✏️</button>
      <button @click="() => deleteTask(id)">🗑️</button>
    </div>
  </div>
</template>
