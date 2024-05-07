import { describe, it, vi, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/react'

import { Modal } from '@/components/Modal'

describe('Modal component', () => {
  it('renders correctly when closed', () => {
    const { queryByTestId } = render(
      <Modal isOpen={false} onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>,
    )

    expect(queryByTestId('modal')).toHaveAttribute('aria-hidden', 'true')
  })

  it('renders correctly when open', () => {
    const { queryByTestId } = render(
      <Modal isOpen={true} onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>,
    )

    expect(queryByTestId('modal')).toHaveAttribute('aria-hidden', 'false')
  })

  it('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn()
    const { getByRole } = render(
      <Modal isOpen={true} onClose={handleClose}>
        <div>Modal Content</div>
      </Modal>,
    )

    const closeButton = getByRole('button')
    fireEvent.click(closeButton)

    expect(handleClose).toHaveBeenCalledTimes(1)
  })
})
