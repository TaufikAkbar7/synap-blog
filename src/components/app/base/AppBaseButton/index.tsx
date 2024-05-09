// react
import React, { memo } from 'react'

// interfaces
import { IAppBaseButtonProps } from './interfaces'

const AppBaseButton = ({ children, ...rest }: IAppBaseButtonProps) => {
  return (
    <button className='bg-black hover:bg-white hover:text-black text-white font-bold py-2 px-4 rounded'></button>
  )
}

AppBaseButton.displayName = 'AppBaseButton'

export default memo(AppBaseButton)
