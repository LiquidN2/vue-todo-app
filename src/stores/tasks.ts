import { ref } from 'vue'
import { defineStore } from 'pinia'
import ShortUniqueId from 'short-unique-id'

interface Task {
  id: string
  text: string
}

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([])

  function addTask(text: string): void {
    if (!text) return
    const { randomUUID } = new ShortUniqueId({ length: 10 })
    tasks.value.push({ id: randomUUID(), text })
  }

  function findTaskIndexById(id: string): number | null {
    if (!id) return null
    const index = tasks.value.findIndex((task) => task.id === id)
    return index >= 0 ? index : null
  }

  // function findTaskById(id: string): Task | null {
  //   const index = findTaskIndexById(id)
  //   return !index ? null : tasks.value[index]
  // }

  function deleteTask(id: string): void {
    if (!id || tasks.value.length === 0) return
    const index = findTaskIndexById(id)
    if (!index) return
    tasks.value.splice(index, 1)
  }

  function updateTask(id: string, text: string): void {
    if (!id || !text || tasks.value.length === 0) return
    const index = findTaskIndexById(id)
    if (!index) return
    tasks.value[index].text = text
  }

  return { tasks, addTask, deleteTask, updateTask }
})
