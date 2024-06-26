import { FormEvent, useState, useEffect } from 'react'
import { twMerge } from 'tailwind-merge'
import { FaAngleDown, FaSearch } from 'react-icons/fa'

import { Modal } from '@/components/Modal'
import { useTask } from '@/contexts'
import { useDebounce } from '@/hooks'
import { TASK_STATUS } from '@/constants/tasks'
import { TaskProps, UseTaskProps } from '@/types/tasks'

import {
  FilterBarProps,
  TaskModalErrorProps,
} from '@/components/FilterBar/types'

const FilterBar = ({
  onFilterChange,
  selectedTask,
  setSelectedTask,
}: FilterBarProps) => {
  const [titleFilter, setTitleFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [statusFilterOpen, setStatusFilterOpen] = useState(false)
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false)
  const [isUpdateTaskModalOpen, setIsUpdateTaskModalOpen] = useState(false)
  const [createTaskModalErrors, setCreateTaskModalErrors] =
    useState<TaskModalErrorProps>({})
  const [updateTaskModalErrors, setUpdateTaskModalErrors] =
    useState<TaskModalErrorProps>({})
  const { tasks, addTask, updateTask } = useTask() as UseTaskProps

  const handleTitleFilterChangeDebounced = useDebounce((value: string) => {
    onFilterChange({ title: value, status: statusFilter })
  }, 300)

  const handleTitleFilterChange = (e: FormEvent<HTMLInputElement>) => {
    setTitleFilter((e.target as HTMLInputElement).value)
    handleTitleFilterChangeDebounced((e.target as HTMLInputElement).value)
  }

  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status)
    setStatusFilterOpen(false)
    onFilterChange({ title: titleFilter, status })
  }

  const resetForm = (form: HTMLFormElement) => {
    form.reset()
  }

  const handleCreateTask = (e: FormEvent) => {
    e.preventDefault()
    const data = new FormData(e.target as HTMLFormElement)
    const formObject = Object.fromEntries(data.entries())

    if (!formObject.title) {
      setCreateTaskModalErrors({ title: 'Task title is required' })
      return
    }

    addTask({
      id: crypto.randomUUID(),
      title: formObject.title.toString(),
      description: formObject.description.toString(),
      status: formObject.status.toString() || 'pending',
    })
    setIsCreateTaskModalOpen(false)
    setCreateTaskModalErrors({})
    resetForm(e.target as HTMLFormElement)
  }

  const handleUpdateTask = (e: FormEvent) => {
    e.preventDefault()
    const data = new FormData(e.target as HTMLFormElement)
    const formObject = Object.fromEntries(data.entries())

    if (!formObject.title) {
      setUpdateTaskModalErrors({ title: 'Task title is required' })
      return
    }

    updateTask(selectedTask ?? '', {
      title: formObject.title.toString(),
      description: formObject.description.toString(),
    })

    setIsUpdateTaskModalOpen(false)
    setUpdateTaskModalErrors({})
    setSelectedTask(null)
    resetForm(e.target as HTMLFormElement)
  }

  const handleCloseUpdateTaskModal = () => {
    setIsUpdateTaskModalOpen(false)
    setSelectedTask(null)
  }

  useEffect(() => {
    if (selectedTask) {
      setIsUpdateTaskModalOpen(true)
    }
  }, [selectedTask])

  return (
    <>
      <section className="flex flex-col gap-4 border-b border-b-secondary bg-white px-4 py-8 md:flex-row md:px-8">
        <div className="flex items-center rounded bg-[#F7F7F7] pl-2 md:pl-4">
          <FaSearch className="hidden shrink-0 text-gray-400 md:block" />
          <input
            type="text"
            placeholder="Search by task title"
            className="h-10 bg-transparent px-2 outline-none placeholder:text-gray-400 md:px-4"
            value={titleFilter}
            onChange={handleTitleFilterChange}
          />
        </div>
        <div className="relative md:grow lg:w-52 lg:grow-0">
          <button
            className="flex w-full items-center justify-between rounded bg-[#F7F7F7] p-2 px-4 ring-1 ring-secondary"
            onClick={() => setStatusFilterOpen(prevState => !prevState)}
            data-testid="status-filter"
          >
            <span
              className={twMerge(statusFilter === 'all' && 'text-gray-400')}
            >
              {statusFilter === 'all'
                ? 'Search by status'
                : TASK_STATUS[statusFilter]}
            </span>
            <FaAngleDown
              className={twMerge(
                'transition-transform',
                statusFilterOpen && 'rotate-180',
              )}
            />
          </button>

          <ul
            className={twMerge(
              'absolute z-20 mt-1 w-full rounded bg-white ring-1 ring-secondary transition-opacity',
              statusFilterOpen ? 'visible opacity-100' : 'invisible opacity-0',
            )}
          >
            <li
              className="cursor-pointer select-none p-2 px-4 hover:bg-gray-50"
              onClick={() => handleStatusFilterChange('all')}
            >
              All
            </li>
            <li
              className="cursor-pointer select-none p-2 px-4 hover:bg-gray-50"
              onClick={() => handleStatusFilterChange('pending')}
            >
              Pending
            </li>
            <li
              className="cursor-pointer select-none p-2 px-4 hover:bg-gray-50"
              onClick={() => handleStatusFilterChange('in_progress')}
            >
              In Progress
            </li>
            <li
              className="cursor-pointer select-none p-2 px-4 hover:bg-gray-50"
              onClick={() => handleStatusFilterChange('completed')}
            >
              Completed
            </li>
          </ul>
        </div>
        <button
          className="mt-4 rounded border border-transparent bg-primary px-4 py-2 text-white transition-colors hover:border-primary hover:bg-white hover:text-primary md:ml-auto md:mt-0"
          onClick={() => setIsCreateTaskModalOpen(true)}
        >
          Add task
        </button>
      </section>
      <Modal
        isOpen={isCreateTaskModalOpen}
        onClose={() => setIsCreateTaskModalOpen(false)}
        title="Create Task"
      >
        <form onSubmit={handleCreateTask}>
          <div className="sm:col-span-3">
            <label
              htmlFor="title"
              className={twMerge(
                'block text-sm font-medium leading-6 text-gray-900',
                createTaskModalErrors.title && 'text-red-400',
              )}
            >
              Task Title *
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="title"
                id="title"
                required
                className={twMerge(
                  'block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400',
                  createTaskModalErrors.title && 'ring-1 ring-red-400',
                )}
              />
              {createTaskModalErrors.title && (
                <small className="text-red-400">Required field</small>
              )}
            </div>
          </div>
          <div className="mt-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Task Description
            </label>
            <div className="mt-2">
              <textarea
                id="description"
                name="description"
                rows={4}
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
              ></textarea>
            </div>
            <fieldset className="mt-4">
              <legend className="text-sm font-semibold leading-6 text-gray-900">
                Task Status
              </legend>
              <p className="text-xs leading-6 text-gray-400">
                By default, all task status is set to pending, if you want to
                set a different status, please select one from the options
                below.
              </p>
              <div className="mt-6 grid grid-cols-3">
                <div className="flex items-center gap-x-3">
                  <input
                    id="pending"
                    name="status"
                    value="pending"
                    defaultChecked
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="pending"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Pending
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="in_progress"
                    name="status"
                    value="in_progress"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="in_progress"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    In Progress
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="completed"
                    name="status"
                    value="completed"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="completed"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Completed
                  </label>
                </div>
              </div>
            </fieldset>
            <hr className="mt-8" />
            <div className="mt-8 text-center">
              <button
                type="submit"
                className="w-full rounded border border-transparent bg-primary px-4 py-2 text-white transition-colors hover:border-primary hover:bg-white hover:text-primary"
              >
                Create Task
              </button>
            </div>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isUpdateTaskModalOpen}
        onClose={handleCloseUpdateTaskModal}
        title="Update Task"
      >
        <form onSubmit={handleUpdateTask}>
          <div className="sm:col-span-3">
            <label
              htmlFor="title"
              className={twMerge(
                'block text-sm font-medium leading-6 text-gray-900',
                updateTaskModalErrors.title && 'text-red-400',
              )}
            >
              Task Title *
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="title"
                id="title"
                defaultValue={
                  (tasks as TaskProps[]).find(
                    (task: { id: string | null }) => task.id === selectedTask,
                  )?.title || ''
                }
                required
                className={twMerge(
                  'block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400',
                  updateTaskModalErrors.title && 'ring-1 ring-red-400',
                )}
              />
              {updateTaskModalErrors.title && (
                <small className="text-red-400">Required field</small>
              )}
            </div>
          </div>
          <div className="mt-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Task Description
            </label>
            <div className="mt-2">
              <textarea
                id="description"
                name="description"
                rows={4}
                defaultValue={
                  (tasks as TaskProps[]).find(
                    (task: { id: string | null }) => task.id === selectedTask,
                  )?.description || ''
                }
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
              ></textarea>
            </div>
            <hr className="mt-8" />
            <div className="mt-8 text-center">
              <button
                type="submit"
                className="w-full rounded border border-transparent bg-primary px-4 py-2 text-white transition-colors hover:border-primary hover:bg-white hover:text-primary"
              >
                Update Task
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  )
}

export { FilterBar }
