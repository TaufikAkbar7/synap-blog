'use client'

// react
import React, { memo } from 'react'
import { createPortal } from 'react-dom'

// interfaces
import { IAppBaseModalProps, IReactPortalProps } from './interfaces'

const ReactPortal = ({ children, wrapperId }: IReactPortalProps) => {
  let getElement = document.getElementById(wrapperId)

  return createPortal(children, getElement as HTMLElement)
}

const AppBaseModal = ({
  onClose,
  children,
  open,
  title
}: IAppBaseModalProps) => {
  if (!open) return null
  return (
    <ReactPortal wrapperId="portal-root">
      <div className="fixed inset-0 bg-[#00000099] flex flex-column justify-center items-center overflow-hidden z-50 p-14">
        <div className="flex flex-col gap-y-5 p-5 w-2/4 bg-white rounded-lg text-black">
          <div className="flex justify-between items-center">
            <h3 className="text-xl text-black font-semibold">{title}</h3>
            <button onClick={onClose}>&#x2715;</button>
          </div>
          {children}
        </div>
      </div>
    </ReactPortal>
  )
}

AppBaseModal.displayName = 'AppBaseModal'

export default memo(AppBaseModal)
