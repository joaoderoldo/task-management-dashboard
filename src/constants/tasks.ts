export const TASK_STATUS = {
  all: 'All',
  pending: 'Pending',
  in_progress: 'In Progress',
  completed: 'Completed',
}

export const TASK_STATUS_VARIANTS = {
  pending:
    'bg-gray-200 text-gray-800 border-gray-300 [&>button:last-child]:border-l [&>button:last-child]:border-l-gray-300',
  in_progress:
    'bg-orange-200 text-orange-800 border-orange-300 [&>button:last-child]:border-l [&>button:last-child]:border-l-orange-300',
  completed:
    'bg-green-200 text-green-800 border-green-300 [&>button:last-child]:border-l [&>button:last-child]:border-l-green-300',
}
