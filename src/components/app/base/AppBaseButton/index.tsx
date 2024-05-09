// react
import React, { forwardRef, memo } from 'react'

// interfaces
import { IAppBaseButtonProps } from './interfaces'

const AppBaseButton = forwardRef<HTMLButtonElement, IAppBaseButtonProps>(
  function AppBaseButton({ children, ...props }, ref) {
    return (
      <button
        {...props}
        ref={ref}
        className="bg-black border-black text-white font-bold py-2 px-4 rounded border hover:bg-white hover:text-black"
      >
        {children}
      </button>
    )
  }
)

AppBaseButton.displayName = 'AppBaseButton'

export default memo(AppBaseButton)
