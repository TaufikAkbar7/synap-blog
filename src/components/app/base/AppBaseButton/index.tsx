// react
import React, { forwardRef, memo } from 'react'

// interfaces
import { IAppBaseButtonProps } from './interfaces'

// components
import AppBaseLoading from '../AppBaseLoading'

const AppBaseButton = forwardRef<HTMLButtonElement, IAppBaseButtonProps>(
  function AppBaseButton(
    { children, className, loading = false, ...props },
    ref
  ) {
    return (
      <button
        {...props}
        ref={ref}
        className={`${className} bg-black border-black flex items-center justify-center text-white font-bold py-2 px-4 rounded border disabled:cursor-not-allowed hover:bg-white hover:text-black`}
      >
        {loading ? <AppBaseLoading customClass="w-6 h-6" /> : children}
      </button>
    )
  }
)

AppBaseButton.displayName = 'AppBaseButton'

export default memo(AppBaseButton)
