import React, { useState } from 'react'

import { auth, firestore, analytics } from './base'

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './theme'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

import Button from '@material-ui/core/Button'

import AppHeader from './components/AppHeader'
import AddBookForm from './components/AddBookForm'
import { Dialog, DialogTitle, Grid, Paper, Divider } from '@material-ui/core'
import BookList from './components/BookList'

import { ReactComponent as PlusIcon } from './assets/dark-icons/plus-circle.svg'
import SignInPage from './pages/SignInPage'

const App = () => {
  const [user] = useAuthState(auth)
  const [dialogOpen, setDialogOpen] = useState(false)

  const signedIn = !!auth.currentUser

  console.log(user, signedIn)

  const handleOpen = () => {
    setDialogOpen(true)
  }

  const handleClose = () => {
    setDialogOpen(false)
  }

  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <AppHeader signedIn={signedIn} user={user} />
          {signedIn ? (
            <>
              <Container style={{ padding: 20 }}>
                <Grid
                  item
                  xs={12}
                  style={{ display: 'flex', paddingBottom: 5 }}
                >
                  <Typography variant='h3' style={{ paddingRight: 20 }}>
                    Book List
                  </Typography>
                  <Button onClick={handleOpen}>
                    <PlusIcon style={{ marginRight: 10 }} /> Add a book
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <BookList />
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12}></Grid>
                </Grid>
              </Container>
              <Dialog open={dialogOpen} onClose={handleClose} maxWidth='xl'>
                <DialogTitle>
                  <Typography variant='h3'>Add Book</Typography>
                </DialogTitle>
                <AddBookForm handleClose={handleClose} />
              </Dialog>
            </>
          ) : (
            <SignInPage />
          )}
        </CssBaseline>
      </ThemeProvider>
    </div>
  )
}

export default App
