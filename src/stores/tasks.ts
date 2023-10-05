import { ref } from 'vue'
import { defineStore } from 'pinia'
import ShortUniqueId from 'short-unique-id'

interface UpdatableTaskData {
  text: string
  isCompleted: boolean
}

interface Task extends UpdatableTaskData {
  id: string
}

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([])

  function addTask(text: string): void {
    if (!text) return
    const { randomUUID } = new ShortUniqueId({ length: 10 })
    tasks.value.push({ id: randomUUID(), text, isCompleted: false })
  }

  function findTaskIndexById(id: string) {
    return tasks.value.findIndex((task) => task.id === id)
  }

  function deleteTask(id: string): void {
    if (!id || tasks.value.length === 0) return
    console.log(`deleting task ${id}`)
    const index = findTaskIndexById(id)
    tasks.value.splice(index, 1)
  }

  function updateTask(id: string, data: Partial<UpdatableTaskData>): void {
    if (!id || tasks.value.length === 0) return
    const index = findTaskIndexById(id)
    if (!index) return
    tasks.value[index] = { ...tasks.value[index], ...data }
  }

  return { tasks, addTask, deleteTask, updateTask }
})
