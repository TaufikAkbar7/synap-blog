// react
import { memo } from 'react'
import { createPortal } from 'react-dom'

// interfaces
import { IReactPortalProps } from './interfaces'

const AppBaseReactPortal = ({ children, wrapperId }: IReactPortalProps) => {
  let getElement = document.getElementById(wrapperId)

  return createPortal(children, getElement as HTMLElement)
}

AppBaseReactPortal.displayName = 'AppBaseReactPortal'

export default memo(AppBaseReactPortal)
