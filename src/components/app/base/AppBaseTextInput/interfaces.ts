import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

export interface IAppBaseTextInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string
  register?: UseFormRegisterReturn
}
