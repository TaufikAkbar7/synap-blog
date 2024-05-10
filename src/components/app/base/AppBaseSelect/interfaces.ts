import { UseFormRegisterReturn } from 'react-hook-form'

export interface IAppBaseSelectProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  label: string
  register: UseFormRegisterReturn
  options: TOptions[]
}

type TOptions = {
  label: string
  value: string
}
