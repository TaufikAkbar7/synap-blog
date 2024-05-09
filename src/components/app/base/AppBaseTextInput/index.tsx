'use client'

// react
import React, { forwardRef, memo, useImperativeHandle, useRef } from 'react'

// interfaces
import { IAppBaseTextInputProps } from './interfaces'

// css
import './style.css'

const AppBaseTextInput = forwardRef<void, IAppBaseTextInputProps>(
  function AppBaseTextInput({ id, label, ...props }, ref) {
    const inputRef = useRef<HTMLInputElement>(null)

    /**
     * @description handle element focus text input
     */
    useImperativeHandle(
      ref,
      () => {
        return {
          focus() {
            inputRef?.current?.focus()
          }
        }
      },
      []
    )

    return (
      <div className="flex justify-center items-center w-full h-full">
        <div className="relative w-full">
          <input {...props} ref={inputRef} placeholder="" />
          <label htmlFor={id}>{label}</label>
        </div>
      </div>
    )
  }
)

AppBaseTextInput.displayName = 'AppBaseTextInput'

export default memo(AppBaseTextInput)