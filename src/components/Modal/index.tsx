import { twMerge } from 'tailwind-merge'
import { MdClose } from 'react-icons/md'

import { ModalProps } from '@/components/Modal/types'

const Modal = ({
  isOpen,
  onClose,
  title = 'Tasker',
  children,
  childrenClassName,
}: ModalProps) => {
  return (
    <div
      className={twMerge(
        'fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ease-in-out',
        isOpen
          ? 'visible opacity-100'
          : 'pointer-events-none invisible opacity-0',
      )}
    >
      <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>
      <div className="modal-container z-50 mx-auto h-auto w-full min-w-[522px] max-w-[700px] rounded-md bg-white shadow-lg">
        <div className="relative flex items-center justify-center rounded-tl-md rounded-tr-md bg-[#ECEFF1] p-4">
          <span className="font-opensans text-base font-bold text-[#425A72]">
            {title}
          </span>
          <button
            onClick={onClose}
            type="button"
            className="absolute right-2 p-2"
          >
            <MdClose size={24} />
          </button>
        </div>
        <div
          className={twMerge(
            'max-h-[calc(100vh-56px)] overflow-y-auto p-6',
            childrenClassName,
          )}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export { Modal }
