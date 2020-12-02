import { Button, Container, Grid } from '@material-ui/core'
import React from 'react'

import { app, auth } from '../base'

import Typography from '@material-ui/core/Typography'

import { ReactComponent as BkrScene } from '../assets/bkr-scene.svg'
import { ReactComponent as GoogleIcon } from '../assets/google-icon.svg'

import customStyles from './sign-in-page.module.css'

const SignInPage = () => {
  const signInWithGoogle = () => {
    const provider = new app.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }

  return (
    <>
      <Container
        style={{
          margin: 'auto',
          paddingTop: '5vh',
          width: '90%',
          textAlign: 'center'
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={5}>
            <BkrScene style={{ width: '100%', height: '400px' }} />
          </Grid>
          <Grid item xs={12} sm={7}>
            <Typography variant='h4'>BKR CONNECT</Typography>
            <Typography variant='h5' style={{ paddingBottom: 20 }}>
              Manage everything about<br></br> Brown Kids Read
            </Typography>
            <Button variant='outlined' size='large' onClick={signInWithGoogle}>
              <GoogleIcon style={{ height: 15, width: 15, marginRight: 15 }} /> <Typography variant='body1'>
                Sign In With
                Google
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={12}></Grid>
        </Grid>
      </Container>
    </>
  )
}

export default SignInPage
