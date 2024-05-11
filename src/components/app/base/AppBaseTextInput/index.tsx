'use client'

// react
import React, { forwardRef, memo } from 'react'

// interfaces
import { IAppBaseTextInputProps } from './interfaces'

// css
import './style.css'

const AppBaseTextInput = forwardRef<void, IAppBaseTextInputProps>(
  function AppBaseTextInput(
    { id, label, placeholder = '', register, ...props },
    /* eslint-disable no-unused-vars */
    ref
  ) {
    // const inputRef = useRef<HTMLInputElement>(null)

    // /**
    //  * @description handle element focus text input
    //  */
    // useImperativeHandle(
    //   ref,
    //   () => {
    //     return {
    //       focus() {
    //         inputRef?.current?.focus()
    //       }
    //     }
    //   },
    //   []
    // )

    return (
      <div className="flex justify-center items-center w-full h-full">
        <div className="relative w-full">
          <input {...props} placeholder={placeholder} {...register} />
          <label htmlFor={id}>{label}</label>
        </div>
      </div>
    )
  }
)

AppBaseTextInput.displayName = 'AppBaseTextInput'

export default memo(AppBaseTextInput)
