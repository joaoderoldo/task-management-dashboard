import { describe, it, vi, expect } from 'vitest'
import { render } from '@testing-library/react'

import { FilterBar } from '@/components/FilterBar'

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
