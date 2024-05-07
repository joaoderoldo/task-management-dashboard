import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { FaAngleRight, FaRegTrashAlt, FaPencilAlt } from 'react-icons/fa'

import { useTask } from '@/contexts'
import { TASK_STATUS, TASK_STATUS_VARIANTS } from '@/constants/tasks'
import { UseTaskProps } from '@/types/tasks'

import { TaskItemProps } from '@/components/TaskItem/types'
import { CardModal } from '@/components/TaskItem/components'

const TaskItem = ({ task, setSelectedTask }: TaskItemProps) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const { removeTask, updateStatus } = useTask() as UseTaskProps

  const handleRemove = () => {
    removeTask(task.id)
  }

  const handleUpdateStatus = (taskId: string, status: string) => {
    updateStatus({ taskId, newStatus: status })

    if (isUpdating) {
      setIsUpdating(false)
    }
  }

  const handleMoveStatus = (taskId: string, currentStatus: string) => {
    updateStatus({ taskId, currentStatus })
  }

  const handleSetSelectedTask = () => {
    setSelectedTask(task.id)
  }

  return (
    <div className="relative min-h-44 rounded border border-secondary bg-white p-4 font-default">
      <div className="flex items-center justify-between">
        <div
          className={twMerge(
            'flex h-6 items-center rounded-md border text-xs',
            TASK_STATUS_VARIANTS[task.status],
          )}
        >
          <button
            className="px-2"
            onClick={() => setIsUpdating(true)}
            data-testid="update-status-button"
          >
            {TASK_STATUS[task.status]}
          </button>
          {task.status !== 'completed' && (
            <button
              className="w-6 cursor-cell text-center"
              onClick={() => handleMoveStatus(task.id, task.status)}
              disabled={task.status === 'completed'}
            >
              <FaAngleRight size={12} className="mx-auto" />
            </button>
          )}
        </div>
        <div className="flex gap-4">
          <button
            className="transition-colors hover:text-orange-400"
            onClick={handleSetSelectedTask}
            data-testid="edit-task-button"
          >
            <FaPencilAlt />
          </button>
          <button
            className="transition-colors hover:text-red-400"
            onClick={() => setIsDeleting(true)}
            data-testid="delete-task-button"
          >
            <FaRegTrashAlt />
          </button>
        </div>
      </div>
      <h3
        className="hover:filter-trash-red mt-4 break-words text-lg font-semibold text-gray-800"
        data-testid="task-title"
      >
        {task.title}
      </h3>
      <p
        className="mt-2 break-words text-xs text-gray-500"
        data-testid="task-description"
      >
        {task.description}
      </p>
      <CardModal isOpen={isDeleting} dataTestId="delete-task-modal">
        <span className="block text-center text-lg font-bold">
          Are you sure?
        </span>
        <span className="mt-2 block text-center text-sm text-gray-600">
          You are about to delete the task <strong>{task.title}</strong>
        </span>
        <div className="mt-auto flex justify-center">
          <button
            className="mr-2 grow rounded-md bg-red-500 px-3 py-1 text-sm text-white"
            onClick={handleRemove}
          >
            Yes, delete
          </button>
          <button
            className="grow rounded-md bg-gray-200 px-4 py-1 text-sm text-gray-800"
            onClick={() => setIsDeleting(false)}
          >
            Cancel
          </button>
        </div>
      </CardModal>
      <CardModal isOpen={isUpdating} dataTestId="update-status-modal">
        <span className="block text-center text-lg font-bold">
          Update Task Status
        </span>
        <div className="mt-2 flex flex-col justify-center gap-2">
          <button
            className=" grow rounded-md bg-gray-200 px-3 py-1 text-sm text-gray-800"
            onClick={() => handleUpdateStatus(task.id, 'pending')}
          >
            Pending
          </button>
          <button
            className=" grow rounded-md bg-orange-200 px-3 py-1 text-sm text-orange-800"
            onClick={() => handleUpdateStatus(task.id, 'in_progress')}
          >
            In Progress
          </button>
          <button
            className="grow rounded-md bg-green-200 px-3 py-1 text-sm text-green-800"
            onClick={() => handleUpdateStatus(task.id, 'completed')}
          >
            Completed
          </button>
        </div>
      </CardModal>
    </div>
  )
}

export { TaskItem }
