// react
import React, { memo } from 'react'

// antd
import { Button, ConfigProvider } from 'antd'

// interfaces
import { IAppBaseButtonProps } from './interfaces'

const AppBaseButton = ({ children, ...rest }: IAppBaseButtonProps) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            controlHeight: 48,
            borderRadius: 24,
            defaultBorderColor: '#472F92'
          }
        }
      }}
    >
      <Button
        className="font-semibold flex items-center justify-center space-x-2"
        {...rest}
      >
        {children}
      </Button>
    </ConfigProvider>
  )
}

AppBaseButton.displayName = 'AppBaseButton'

export default memo(AppBaseButton)
