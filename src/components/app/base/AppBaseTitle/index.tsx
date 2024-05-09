// react
import React, { memo } from 'react'

// interfaces
import { AppBaseTitleProps } from './interfaces'

const AppBaseTitle = ({ title }: AppBaseTitleProps) => {
  return <h1 className="text-4xl font-bold pb-5">{title}</h1>
}

AppBaseTitle.displayName = 'AppBaseTitle'

export default memo(AppBaseTitle)
