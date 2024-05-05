import { createContext, useContext, useState, useEffect } from 'react'

const TaskContext = createContext()

const localStorageKey = import.meta.env.VITE_LOCAL_STORAGE_KEY || 'tasks'

const initialTasks = []

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem(localStorageKey)
    return savedTasks ? JSON.parse(savedTasks) : initialTasks
  })

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(tasks))
  }, [tasks])

  const addTask = task => {
    setTasks(prevTasks => [...prevTasks, task])
  }

  const removeTask = taskId => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId))
  }

  const updateTask = (taskId, updatedTask) => {
    setTasks(prevTasks => {
      return prevTasks.map(task => {
        if (task.id === taskId) {
          return {
            ...task,
            ...updatedTask,
          }
        } else {
          return task
        }
      })
    })
  }

  const updateStatus = ({ taskId, currentStatus, newStatus = null }) => {
    let updatedStatus = newStatus ? newStatus : ''

    if (!newStatus) {
      if (currentStatus === 'pending') {
        updatedStatus = 'in_progress'
      } else if (currentStatus === 'in_progress') {
        updatedStatus = 'completed'
      }
    }

    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: updatedStatus } : task,
      ),
    )
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        removeTask,
        updateTask,
        updateStatus,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

const useTask = () => {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider')
  }
  return context
}

export { TaskProvider, useTask }
