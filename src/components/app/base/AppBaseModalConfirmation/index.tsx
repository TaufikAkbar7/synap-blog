// react
import React, { memo } from 'react'

// interfaces
import { IAppBaseModalConfirmationProps } from './interfaces'

// components
import AppBaseReactPortal from '../AppBaseReactPortal'
import AppBaseButton from '../AppBaseButton'

// react icons
import { PiWarningCircleLight } from 'react-icons/pi'
import { CiCircleCheck } from 'react-icons/ci'

const AppBaseModalConfirmation = ({
  onClose,
  open,
  title = 'Are you sure want delete this data?',
  onOk,
  isLoading,
  type = 'warning'
}: IAppBaseModalConfirmationProps) => {
  if (!open) return null
  return (
    <AppBaseReactPortal wrapperId="portal-root">
      <div className="fixed inset-0 bg-[#00000099] flex flex-column justify-center items-center overflow-hidden z-50 p-14">
        <div className="flex flex-col gap-y-5 p-5 w-full bg-white rounded-lg text-black sm:!w-2/4">
          <div className="flex justify-end items-center">
            <button onClick={onClose}>&#x2715;</button>
          </div>
          <div className="flex flex-col gap-y-5 items-center">
            {type === 'warning' ? (
              <PiWarningCircleLight className="w-40 h-40" />
            ) : (
              <CiCircleCheck className="w-40 h-40" />
            )}
            <h3 className="text-lg">{title}</h3>
            {type === 'warning' ? (
              <div className="flex justify-between gap-x-5 w-full">
                <AppBaseButton
                  disabled={isLoading}
                  loading={isLoading}
                  className="w-full"
                  onClick={onOk}
                >
                  Yes
                </AppBaseButton>
                <AppBaseButton
                  disabled={isLoading}
                  loading={isLoading}
                  className="w-full"
                  onClick={onClose}
                >
                  No
                </AppBaseButton>
              </div>
            ) : (
              <AppBaseButton
                disabled={isLoading}
                loading={isLoading}
                onClick={onClose}
              >
                Close
              </AppBaseButton>
            )}
          </div>
        </div>
      </div>
    </AppBaseReactPortal>
  )
}

AppBaseModalConfirmation.displayName = 'AppBaseModalConfirmation'

export default memo(AppBaseModalConfirmation)
