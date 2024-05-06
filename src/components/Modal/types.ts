import { ReactElement } from 'react'

export interface ModalProps {
  isOpen: boolean
  onClose?: () => void
  title?: string
  children: ReactElement
  childrenClassName?: string
}
