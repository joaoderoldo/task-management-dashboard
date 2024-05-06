export interface TaskProviderProps {
  children: React.ReactNode
}

export interface UpdateStatusProps {
  taskId: string
  currentStatus?: string
  newStatus?: string | null
}
