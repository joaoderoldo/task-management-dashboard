import { createContext, useContext, useState, useEffect } from 'react'

import { UseTaskProps, TaskProps } from '@/types/tasks'

import {
  TaskProviderProps,
  UpdateStatusProps,
} from '@/contexts/TaskContext/types'

const TaskContext = createContext<UseTaskProps | undefined>(undefined)

const localStorageKey = import.meta.env.VITE_LOCAL_STORAGE_KEY || 'tasks'

const TaskProvider = ({ children }: TaskProviderProps) => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem(localStorageKey)
    return savedTasks ? JSON.parse(savedTasks) : []
  })

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(tasks))
  }, [tasks])

  const addTask = (task: TaskProps) => {
    setTasks((prevTasks: TaskProps[]) => [...prevTasks, task])
  }

  const removeTask = (taskId: string) => {
    setTasks((prevTasks: TaskProps[]) =>
      prevTasks.filter(task => task.id !== taskId),
    )
  }

  const updateTask = (taskId: string, updatedTask: Partial<TaskProps>) => {
    setTasks((prevTasks: TaskProps[]) => {
      return prevTasks.map((task: TaskProps) => {
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

  const updateStatus = ({
    taskId,
    currentStatus,
    newStatus = null,
  }: UpdateStatusProps) => {
    let updatedStatus = newStatus ? newStatus : ''

    if (!newStatus) {
      if (currentStatus === 'pending') {
        updatedStatus = 'in_progress'
      } else if (currentStatus === 'in_progress') {
        updatedStatus = 'completed'
      }
    }

    setTasks((prevTasks: TaskProps[]) =>
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
