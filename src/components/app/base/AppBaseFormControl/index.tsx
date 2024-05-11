// react
import React, { memo } from 'react'

// interfaces
import { IAppBaseFormControl } from './interfaces'

const AppBaseFormControl = ({
  children,
  errorMessage
}: IAppBaseFormControl) => {
  return (
    <div>
      {children}
      <p className="text-xs text-red-500">{errorMessage}</p>
    </div>
  )
}

AppBaseFormControl.displayName = 'AppBaseFormControl'

export default memo(AppBaseFormControl)
