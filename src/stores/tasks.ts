import { ref, computed } from 'vue'
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

  const totalTasks = computed(() => tasks.value.length)

  const completedTasks = computed(() => {
    // return 0
    if (tasks.value.length === 0) return 0
    return tasks.value.reduce(
      (accumulator, currentValue) => accumulator + (currentValue.isCompleted ? 1 : 0),
      0
    )
  })

  const message = computed(() =>
    totalTasks.value && totalTasks.value === completedTasks.value
      ? 'Congratulations!'
      : 'Keep it up!'
  )

  function fetchSavedTasks() {
    tasks.value = JSON.parse(localStorage.getItem('tasks') || '[]')
  }

  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks.value))
  }

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
    console.log('updating task')
    if (!id || tasks.value.length === 0) return
    const index = findTaskIndexById(id)
    tasks.value[index] = { ...tasks.value[index], ...data }
  }

  return {
    tasks,
    totalTasks,
    completedTasks,
    message,
    fetchSavedTasks,
    saveTasks,
    addTask,
    deleteTask,
    updateTask
  }
})
