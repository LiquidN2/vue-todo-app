<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import { useTaskStore } from '@/stores/tasks'

function getCheckboxStyle(isChecked: boolean) {
  return isChecked ? 'bg-green-600 border-green-600' : 'bg-transparent border-orange-600'
}

function getTaskTextStyle(isCompleted: boolean) {
  return isCompleted ? 'line-through' : 'no-underline'
}

const props = defineProps({
  id: { type: String, required: true },
  text: { type: String, required: true },
  isCompleted: { type: Boolean, required: true }
})

const inputValue = ref<string>(props.text)
const isEditable = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)
const iconEdit = ref('✏️')
const isCompletedValue = ref(props.isCompleted)
const checkboxStyle = ref(getCheckboxStyle(props.isCompleted))
const taskTextStyle = ref(getTaskTextStyle(props.isCompleted))

const { deleteTask, updateTask } = useTaskStore()

const inputTaskName = computed(() => `task-${props.id}`)
const checkboxTask = computed(() => `checkbox-${props.id}`)

watch(isEditable, (newIsEditable) => {
  iconEdit.value = newIsEditable ? '💾' : '✏️'

  if (newIsEditable) {
    if (inputRef.value) {
      console.log(`focusing on ${inputRef.value.id}`)
      inputRef.value.focus()
    }
    return
  }

  console.log('saving')

  updateTask(props.id, { text: props.text })
})

watch(isCompletedValue, (newIsCompletedValue) => {
  updateTask(props.id, { isCompleted: newIsCompletedValue })
  checkboxStyle.value = getCheckboxStyle(newIsCompletedValue)
  taskTextStyle.value = getTaskTextStyle(newIsCompletedValue)
})
</script>

<template>
  <div
    class="flex justify-between bg-stone-900 text-[#e5d2c4] border-[1px] border-[#e5d2c4] rounded-lg px-6 py-3"
  >
    <div class="flex flex-grow">
      <label
        class="rounded-full w-6 h-6 border-[1px] mr-4"
        :class="checkboxStyle"
        :for="checkboxTask"
        title="mark as completed"
      >
        <input :id="checkboxTask" type="checkbox" v-model="isCompletedValue" class="hidden" />
      </label>
      <input
        type="text"
        ref="inputRef"
        class="bg-stone-700 disabled:bg-stone-900 disabled:text-[#e5d2c4]"
        :class="taskTextStyle"
        :id="id"
        :name="inputTaskName"
        :disabled="!isEditable"
        v-model="inputValue"
      />
    </div>
    <div>
      <button class="mr-2" @click="isEditable = !isEditable" title="edit task">
        {{ iconEdit }}
      </button>
      <button @click="deleteTask(id)" title="delete task">🗑️</button>
    </div>
  </div>
</template>
