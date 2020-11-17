import { createMuiTheme } from '@material-ui/core/styles'
const theme = createMuiTheme({
  palette: {
    primary: { main: '#bcaaa4' },
    secondary: { main: '#ffe57f' }
  },
  typography: {
    fontFamily: 'Raleway, sans-serif',
    h1: {
      fontFamily: 'Poppins',
      fontWeight: 100
    },
    h2: {
      fontFamily: 'Poppins',
      fontWeight: 200
    },
    h3: {
      fontFamily: 'Poppins',
      fontWeight: 200
    },
    caption: {
      fontSize: '.8em'
    }
  }
})
export default theme
