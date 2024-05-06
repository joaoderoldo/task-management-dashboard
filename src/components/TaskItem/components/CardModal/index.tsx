import { twMerge } from 'tailwind-merge'

import { CardModalProps } from '@/components/TaskItem/components/CardModal/types'

const CardModal = ({ isOpen, children }: CardModalProps) => {
  return (
    <div
      className={twMerge(
        'absolute inset-0 flex h-full w-full flex-col rounded bg-white p-4 transition-opacity',
        isOpen ? 'visible opacity-100' : 'invisible opacity-0',
      )}
    >
      {children}
    </div>
  )
}

export { CardModal }
