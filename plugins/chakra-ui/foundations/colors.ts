import tailwindColors from './tailwindColors'
import customColors from './customColors'

const colors = {
  brand: tailwindColors.blue,
  gray: tailwindColors.blueGray,

  success: tailwindColors.green,
  green: tailwindColors.green,

  error: tailwindColors.rose,
  red: tailwindColors.rose,

  warning: tailwindColors.amber,
  orange: tailwindColors.amber,

  info: tailwindColors.sky,
  blue: tailwindColors.sky,

  // custom colors
  ...customColors
}

export default colors
