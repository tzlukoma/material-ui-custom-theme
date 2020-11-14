import React from 'react'

import { auth, firestore, analytics } from './base'

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './theme'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

import AppHeader from './components/AppHeader'
import AddBookForm from './components/AddBookForm'
import { Grid, Paper } from '@material-ui/core'
import BookList from './components/BookList'

const App = () => {
  const [user] = useAuthState(auth)

  const signedIn = !!auth.currentUser

  console.log(user, signedIn)

  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <AppHeader signedIn={signedIn} user={user} />
          <Container style={{ padding: 20 }}>
            <BookList />
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant='h3'>Add a book:</Typography>
                <Paper style={{ padding: 5 }}>
                  <AddBookForm />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </CssBaseline>
      </ThemeProvider>
    </div>
  )
}

export default App
