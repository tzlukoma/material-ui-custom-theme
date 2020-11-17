import { Button, Container } from '@material-ui/core'
import React from 'react'

import { app, auth } from '../base'

import Typography from '@material-ui/core/Typography'

import { ReactComponent as GoogleIcon } from '../assets/google-icon.svg'

const SignInPage = () => {
  const signInWithGoogle = () => {
    const provider = new app.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }

  return (
    <Container
      style={{
        margin: 'auto',
        paddingTop: '20vh',
        width: '90%',
        textAlign: 'center'
      }}
    >
      <Button variant='outlined' size='large' onClick={signInWithGoogle}>
        <Typography variant='h5'>
          <GoogleIcon style={{ height: 20, width: 20 }} /> Sign In With Google
        </Typography>
      </Button>
    </Container>
  )
}

export default SignInPage
