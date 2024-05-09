import { Styles } from '@chakra-ui/theme-tools'

const styles: Styles = {
  global: () => ({
    html: {
      bg: 'white.alpha.800'
    },
    body: {
      bg: 'gray.50',
      WebkitTapHighlightColor: 'transparent',
      _dark: {
        bg: 'gray.800'
      }
    },
    '#chakra-toast-portal > *': {
      pt: 'safe-top',
      pl: 'safe-left',
      pr: 'safe-right',
      pb: 'safe-bottom'
    }
  })
}

export default styles
