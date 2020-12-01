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
    minHeight: "100%",
    '&:hover': {
      backgroundColor: '#fcefdcd5',
      cursor: 'pointer'
    }
  }
}))

interface Book {
  id: string,
  title: string,
  author: string,
  coverImage: string,
  sku: string
}



const BookList = () => {
  const classes = useStyles()

  const booksRef = firestore.collection('books')
  const query = booksRef.orderBy('createdAt', 'desc')

  const [books] = useCollectionData<Book>(query, { idField: 'id' })
  books && console.log(books)

  return (
    <div>
      <Grid container style={{ padding: 12 }}>
        <Grid item xs={12}>
          <List>  <Grid container>
            {books &&
              books.map(book => {
                return (


                  <Grid item xs={12} sm={6} lg={3}>
                    <ListItem key={book.id} className={classes.listItem}>
                      <ListItemAvatar >
                        <img
                          src={book.coverImage}
                          alt={`Book cover`}
                          style={{ width: 100, margin: 'auto', height: "auto" }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        style={{
                          marginLeft: 20
                        }}
                      >
                        <Typography variant='h6'>{book.title}</Typography>
                        <Typography>{`by ${book.author}`}</Typography>
                        <Typography variant='caption'>{book.sku}</Typography>
                      </ListItemText>
                    </ListItem>
                  </Grid>
                )
              })} </Grid>
          </List>
        </Grid>
      </Grid>
    </div>
  )
}

export default BookList
