import { create } from 'zustand'

interface Task {
  id?: string
  title?: string
  description?: string
  status?: string
}

interface TasksStore {
  tasks: Task[]
  addTask: (task: Task) => void
  deleteTask: (taskId: string) => void
  updateTask: (taskId: string, updatedTask: Task) => void
  updateStatus: (args: {
    taskId: string
    currentStatus: string
    newStatus?: string
  }) => void
}

const localStorageKey = import.meta.env.VITE_LOCAL_STORAGE_KEY || 'tasks'

const useTasksStore = create<TasksStore>(set => {
  const storedTasks = JSON.parse(localStorage.getItem(localStorageKey)!)
  const initialTasks = Array.isArray(storedTasks) ? storedTasks : []

  return {
    tasks: initialTasks,
    addTask: task =>
      set(state => {
        const updatedTasks = [...state.tasks, task]
        localStorage.setItem(localStorageKey, JSON.stringify(updatedTasks))
        return { tasks: updatedTasks }
      }),
    deleteTask: taskId =>
      set(state => {
        const updatedTasks = state.tasks.filter(task => task.id !== taskId)
        localStorage.setItem(localStorageKey, JSON.stringify(updatedTasks))
        return { tasks: updatedTasks }
      }),
    updateTask: (taskId, updatedTask) =>
      set(state => {
        const updatedTasks = state.tasks.map(task =>
          task.id === taskId ? { ...task, ...updatedTask } : task,
        )
        localStorage.setItem(localStorageKey, JSON.stringify(updatedTasks))
        return { tasks: updatedTasks }
      }),
    updateStatus: ({ taskId, currentStatus, newStatus }) =>
      set(state => {
        let updatedStatus = newStatus ? newStatus : ''

        if (!newStatus) {
          if (currentStatus === 'pending') {
            updatedStatus = 'in_progress'
          } else if (currentStatus === 'in_progress') {
            updatedStatus = 'completed'
          }
        }

        const updatedTasks = state.tasks.map(task =>
          task.id === taskId ? { ...task, status: updatedStatus } : task,
        )
        localStorage.setItem(localStorageKey, JSON.stringify(updatedTasks))
        return { tasks: updatedTasks }
      }),
  }
})

export { useTasksStore }
