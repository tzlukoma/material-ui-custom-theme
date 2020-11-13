import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './theme'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import AppHeader from './components/AppHeader'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    paddingTop: 20,
    margin: 'auto'
  }
}))

const Types = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Container maxWidth='sm'>
        <Typography variant='h1' component='h2' gutterBottom>
          h1. Heading
        </Typography>
        <Typography variant='h2' gutterBottom>
          h2. Heading
        </Typography>
        <Typography variant='h3' gutterBottom>
          h3. Heading
        </Typography>
        <Typography variant='h4' gutterBottom>
          h4. Heading
        </Typography>
        <Typography variant='h5' gutterBottom>
          h5. Heading
        </Typography>
        <Typography variant='h6' gutterBottom>
          h6. Heading
        </Typography>
        <Typography variant='subtitle1' gutterBottom>
          subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Quos blanditiis tenetur
        </Typography>
        <Typography variant='subtitle2' gutterBottom>
          subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Quos blanditiis tenetur
        </Typography>
        <Typography variant='body1' gutterBottom>
          body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
          blanditiis tenetur unde suscipit, quam beatae rerum inventore
          consectetur, neque doloribus, cupiditate numquam dignissimos laborum
          fugiat deleniti? Eum quasi quidem quibusdam.
        </Typography>
        <Typography variant='body2' gutterBottom>
          body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
          blanditiis tenetur unde suscipit, quam beatae rerum inventore
          consectetur, neque doloribus, cupiditate numquam dignissimos laborum
          fugiat deleniti? Eum quasi quidem quibusdam.
        </Typography>
        <Typography variant='button' display='block' gutterBottom>
          button text
        </Typography>
        <Typography variant='caption' display='block' gutterBottom>
          caption text
        </Typography>
        <Typography variant='overline' display='block' gutterBottom>
          overline text
        </Typography>
      </Container>
    </div>
  )
}

function App () {
  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <AppHeader />
        </CssBaseline>
      </ThemeProvider>
    </div>
  )
}

export default App
