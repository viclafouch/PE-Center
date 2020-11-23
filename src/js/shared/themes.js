import blue from '@material-ui/core/colors/blue'
import pink from '@material-ui/core/colors/pink'
import { createMuiTheme } from '@material-ui/core/styles'

import { DARK_THEME, LIGHT_THEME } from './constants'

const darkMuiTheme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink,
    type: DARK_THEME
  }
})

const lightMuiTheme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink,
    type: LIGHT_THEME
  }
})

export default {
  dark: darkMuiTheme,
  light: lightMuiTheme
}
