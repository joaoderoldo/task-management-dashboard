export interface FilterBarProps {
  onFilterChange: (filters: { title: string; status: string }) => void
  selectedTask: string | null
  setSelectedTask: (taskId: string | null) => void
}

export interface TaskModalErrorProps {
  title?: string
}
