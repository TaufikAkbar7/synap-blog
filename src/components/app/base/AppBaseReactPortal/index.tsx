// react
import React, { memo } from 'react'
import { createPortal } from 'react-dom'

// interfaces
import { IAppBaseReactPortalProps } from './interfaces'

const AppBaseReactPortal = ({
  children,
  wrapperId
}: IAppBaseReactPortalProps) => {
  let getElement = document.getElementById(wrapperId)

  return createPortal(children, getElement as HTMLElement)
}

AppBaseReactPortal.displayName = 'AppBaseReactPortal'

export default memo(AppBaseReactPortal)
