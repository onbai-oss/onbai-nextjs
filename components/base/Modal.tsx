import { Dialog, Transition } from '@headlessui/react'
import { XCircleIcon } from '@heroicons/react/solid'
import React, { Fragment } from 'react'

export interface IModalProps {
  isOpen: boolean
  closeModal: () => any
  children: JSX.Element
  initialFocus?
}

export function Modal({
  isOpen,
  closeModal,
  children,
  initialFocus,
}: IModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto bg-opacity-75 bg-white"
        onClose={closeModal}
        initialFocus={initialFocus}
      >
        <div className="min-h-screen px-2 sm:px-4 text-center">
          <Transition.Child as={Fragment}>
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          <Transition.Child as={Fragment}>
            <div className="inline-block w-full max-w-md p-4 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-lg hover:shadow-xl rounded-md relative">
              {/* Modal content */}
              {children}

              <button
                onClick={closeModal}
                className={`absolute top-1.5 right-1 appearance-none bg-transparent border-none outline-none`}
              >
                <XCircleIcon
                  className={`hover:opacity-75 text-gray-600`}
                  width="28"
                ></XCircleIcon>
              </button>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
