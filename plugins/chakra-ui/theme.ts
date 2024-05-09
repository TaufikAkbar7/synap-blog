import { extendTheme } from '@chakra-ui/react'

import foundations from './foundations'
import { config } from './config'
import * as components from './components'
import styles from './style'

export const theme = extendTheme({
  config,
  styles,
  ...foundations,
  components: { ...components }
})
