import { useState, useEffect, SetStateAction } from 'react'

import { TaskItem, FilterBar } from '@/components'
import { TaskProps } from '@/types/tasks'

import { HandleFilterChangeProps } from '@/components/TaskList/types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TaskList = ({ tasks }: { tasks: any }) => {
  const [filteredTasks, setFilteredTasks] = useState(tasks)
  const [selectedTask, setSelectedTask] = useState(null)

  useEffect(() => {
    setFilteredTasks(tasks)
  }, [tasks])

  const handleFilterChange = ({ title, status }: HandleFilterChangeProps) => {
    let filtered = tasks
    if (title) {
      filtered = (filtered as TaskProps[]).filter(task =>
        task.title.toLowerCase().includes(title.toLowerCase()),
      )
    }
    if (status && status !== 'all') {
      filtered = (filtered as TaskProps[]).filter(
        task => task.status === status,
      )
    }
    setFilteredTasks(filtered)
  }

  return (
    <>
      <FilterBar
        onFilterChange={handleFilterChange}
        selectedTask={selectedTask}
        setSelectedTask={(taskId: string | null) =>
          setSelectedTask(taskId as SetStateAction<null>)
        }
      />
      <div className="min-h-[calc(100vh-75px)] bg-[#F7F7F7] p-8">
        {(filteredTasks as TaskProps[]).length === 0 && (
          <div className="flex h-[calc(100vh-150px)] items-center justify-center">
            <h2 className="text-center text-xl font-semibold">
              No tasks found
            </h2>
          </div>
        )}
        <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
          {(filteredTasks as TaskProps[]).map(task => (
            <TaskItem
              key={task.id}
              task={task}
              setSelectedTask={(taskId: string | null) =>
                setSelectedTask(taskId as SetStateAction<null>)
              }
            />
          ))}
        </div>
      </div>
    </>
  )
}

export { TaskList }
