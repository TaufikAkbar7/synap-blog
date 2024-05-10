// react
import React, { memo } from 'react'

// interfaces
import { IAppBaseSelectProps } from './interfaces'

// css
import '../AppBaseTextInput/style.css'

const AppBaseSelect = ({
  id,
  options,
  label,
  register,
  ...props
}: IAppBaseSelectProps) => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="relative w-full">
        <select {...props} {...register}>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <label htmlFor={id}>{label}</label>
      </div>
    </div>
  )
}

AppBaseSelect.displayName = 'AppBaseSelect'

export default memo(AppBaseSelect)
