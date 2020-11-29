import React from 'react'

import { auth } from '../base'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import { ReactComponent as BookIcon } from '../assets/book.svg'
import { ReactComponent as SignOutIcon } from '../assets/dark-icons/logout.svg'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

type AppHeaderProps = {
  signedIn:boolean,
  user:object
}

const AppHeader = ({ signedIn, user }:AppHeaderProps) => {
  const classes = useStyles()

  function SignOut () {
    return (
      <Button variant='outlined' onClick={() => auth.signOut()}>
        <SignOutIcon style={{ marginRight: 10, width: 20 }} />
        <Typography variant='h6'>Sign Out</Typography>
      </Button>
    )
  }

  return (
    <div className={classes.root}>
      <AppBar position='static' color='primary'>
        <Toolbar>
          <BookIcon style={{ paddingRight: 5 }} />
          <Typography variant='h6' className={classes.title}>
            BKR CONNECT
          </Typography>
          {auth.currentUser && <SignOut />}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default AppHeader
