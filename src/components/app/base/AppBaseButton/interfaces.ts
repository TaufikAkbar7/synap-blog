// antd
import { ButtonProps } from 'antd'

import { ReactElement } from 'react'

export interface IAppBaseButtonProps extends ButtonProps {
  children: ReactElement | string
}
