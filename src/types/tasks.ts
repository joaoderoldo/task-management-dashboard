export interface TaskProps {
  id: string
  title: string
  description?: string
  status: string
}

export interface UseTaskProps {
  tasks: TaskProps | TaskProps[]
  addTask: (task: TaskProps) => void
  removeTask: (taskId: string) => void
  updateTask: (taskId: string, task: Partial<TaskProps>) => void
  updateStatus: (args: {
    taskId: string
    currentStatus?: string
    newStatus?: string
  }) => void
}
