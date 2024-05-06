import { TaskProps } from '@/types/tasks'

export interface TaskItemProps {
  task: TaskProps
  setSelectedTask: (taskId: string) => void
}
