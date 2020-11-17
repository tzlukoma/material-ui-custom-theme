import React from 'react'

import { firestore } from '../base'

import { useCollectionData } from 'react-firebase-hooks/firestore'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import {
  List,
  ListItem,
  Grid,
  ListItemAvatar,
  ListItemText
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: 10,
    '&:hover': {
      backgroundColor: '#fcefdcd5',
      cursor: 'pointer'
    }
  }
}))

const BookList = () => {
  const classes = useStyles()

  const booksRef = firestore.collection('books')
  const query = booksRef.orderBy('createdAt')

  const [books] = useCollectionData(query, { idField: 'id' })

  return (
    <div>
      <Grid container style={{ padding: 12 }}>
        <Grid item xs={12}>
          <List>
            {books &&
              books.map(book => {
                return (
                  <ListItem container spacing={3} className={classes.listItem}>
                    <ListItemAvatar item xs={2}>
                      <img
                        src={book.coverImage}
                        alt={`Book cover`}
                        style={{ width: 100, margin: 'auto' }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      item
                      xs={10}
                      style={{
                        marginLeft: 20
                      }}
                    >
                      <Typography variant='h4'>{book.bookName}</Typography>
                      <Typography>{`by ${book.author}`}</Typography>
                      <Typography variant='caption'>{book.sku}</Typography>
                    </ListItemText>
                  </ListItem>
                )
              })}
          </List>
        </Grid>
      </Grid>
    </div>
  )
}

export default BookList
