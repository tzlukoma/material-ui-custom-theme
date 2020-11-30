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

interface Book {
  id:string,
  title:string, 
  author:string,
  coverImage:string,
  sku:string
}



const BookList = () => {
  const classes = useStyles()

  const booksRef = firestore.collection('books')
  const query = booksRef.orderBy('createdAt', 'desc')

  const [books] = useCollectionData<Book>(query, { idField: 'id' })

  return (
    <div>
      <Grid container style={{ padding: 12 }}>
        <Grid item xs={12}>
          <List>
            {books &&
              books.map(book => {
                return (
                  <ListItem key={book.id} className={classes.listItem}>
                    <ListItemAvatar >
                      <img
                        src={book.coverImage}
                        alt={`Book cover`}
                        style={{ width: 100, margin: 'auto' }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      style={{
                        marginLeft: 20
                      }}
                    >
                      <Typography variant='h4'>{book.title}</Typography>
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
