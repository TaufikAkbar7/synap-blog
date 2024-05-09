import { ReactElement } from 'react'

export interface IAppBaseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactElement | string
}
