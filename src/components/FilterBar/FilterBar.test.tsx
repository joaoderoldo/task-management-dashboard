import { describe, it, vi, expect } from 'vitest'
import { render } from '@testing-library/react'

import { FilterBar } from '@/components/FilterBar'

vi.mock('@/contexts', () => ({
  useTask: () => ({
    tasks: [
      { id: '1', title: 'Test task 1', status: 'pending' },
      { id: '2', title: 'Test task 2', status: 'in_progress' },
      { id: '3', title: 'Test task 3', status: 'completed' },
    ],
    addTask: vi.fn(),
    updateTask: vi.fn(),
  }),
}))

// create mock for FilterBar component props
const mockOnFilterChange = vi.fn()
const mockSelectedTask = '1'
const mockSetSelectedTask = vi.fn()

describe('FilterBar component', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <FilterBar
        onFilterChange={mockOnFilterChange}
        selectedTask={mockSelectedTask}
        setSelectedTask={mockSetSelectedTask}
      />,
    )

    expect(getByPlaceholderText('Search by task title')).toBeInTheDocument()
    expect(getByText('Search by status')).toBeInTheDocument()
    expect(getByText('Add task')).toBeInTheDocument()
  })
})
