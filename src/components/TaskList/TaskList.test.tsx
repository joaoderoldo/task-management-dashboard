import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import { TaskList } from '@/components/TaskList'

const mockTasks = [
  {
    id: '1',
    title: 'Test Task',
    description: 'This is a test task 1',
    status: 'pending',
  },
  {
    id: '2',
    title: 'Test task 2',
    description: 'This is a test task 2',
    status: 'in_progress',
  },
  {
    id: '3',
    title: 'Test task 3',
    description: 'This is a test task 3',
    status: 'completed',
  },
]

describe('TaskList component', () => {
  it('renders tasks correctly', () => {
    const { getByText } = render(<TaskList tasks={mockTasks} />)

    mockTasks.forEach(task => {
      expect(getByText(task.description)).toBeInTheDocument()
    })
  })

  it('filters tasks by title', () => {
    const { getByPlaceholderText, getByText } = render(
      <TaskList tasks={mockTasks} />,
    )

    const input = getByPlaceholderText('Search by task title')
    fireEvent.change(input, { target: { value: 'Test Task' } })

    setTimeout(() => {
      expect(getByText('This is a test task 1')).toBeInTheDocument()
      expect(getByText('This is a test task 2')).not.toBeInTheDocument()
      expect(getByText('This is a test task 3')).not.toBeInTheDocument()
    }, 500)
  })
})
