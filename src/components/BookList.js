import React from 'react'

import { firestore } from '../base'

import { useCollectionData } from 'react-firebase-hooks/firestore'

import Typography from '@material-ui/core/Typography'

import {
  List,
  ListItem,
  Grid,
  ListItemAvatar,
  ListItemText,
  Avatar
} from '@material-ui/core'

const BookList = () => {
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
                  <ListItem container spacing={3}>
                    <ListItemAvatar item xs={2}>
                      <img
                        src={book.coverImage}
                        alt={`Book cover`}
                        style={{ height: 100, margin: 'auto' }}
                      />
                    </ListItemAvatar>
                    <ListItemText item xs={10} style={{ marginLeft: 20 }}>
                      <Typography variant='h4'>{book.bookName}</Typography>
                      <Typography>{`by ${book.author}`}</Typography>
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
