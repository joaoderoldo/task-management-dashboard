import { describe, it, vi, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import { TaskItem } from '@/components/TaskItem'

describe('TaskItem component', () => {
  const mockTask = {
    id: '1',
    title: 'Test Task',
    description: 'This is a test task',
    status: 'pending',
  }

  it('renders task title and description correctly', () => {
    const { getByTestId } = render(
      <TaskItem task={mockTask} setSelectedTask={() => {}} />,
    )

    expect(getByTestId('task-title')).toHaveTextContent('Test Task')
    expect(getByTestId('task-description')).toHaveTextContent(
      'This is a test task',
    )
  })

  it('displays update status modal when update button is clicked', () => {
    const { getByTestId } = render(
      <TaskItem task={mockTask} setSelectedTask={() => {}} />,
    )

    const updateButton = getByTestId('update-status-button')
    fireEvent.click(updateButton)

    expect(getByTestId('update-status-modal')).toHaveClass(
      'visible opacity-100',
    )
  })

  it('displays delete confirmation modal when delete button is clicked', () => {
    const { getByTestId } = render(
      <TaskItem task={mockTask} setSelectedTask={() => {}} />,
    )

    const deleteButton = getByTestId('delete-task-button')
    fireEvent.click(deleteButton)

    expect(getByTestId('delete-task-modal')).toHaveClass('visible opacity-100')
  })

  it('calls setSelectedTask with correct task ID when edit button is clicked', () => {
    const setSelectedTask = vi.fn()
    const { getByTestId } = render(
      <TaskItem task={mockTask} setSelectedTask={setSelectedTask} />,
    )

    const editButton = getByTestId('edit-task-button')
    fireEvent.click(editButton)

    expect(setSelectedTask).toHaveBeenCalledWith('1')
  })
})
