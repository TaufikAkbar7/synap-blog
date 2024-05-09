import { ReactNode } from 'react'

export interface IReactPortalProps {
  children: ReactNode | any
  wrapperId: string
}

export interface IAppBaseModalProps {
  children: ReactNode
  onClose: () => void
  open: boolean
  title: string
}
