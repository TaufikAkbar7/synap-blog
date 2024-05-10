import { ReactNode } from 'react'

export interface IAppBaseModalProps {
  children: ReactNode
  onClose: () => void
  open: boolean
  title: string
}
