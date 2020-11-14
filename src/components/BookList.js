import React from 'react'

import { firestore } from '../base'

import { useCollectionData } from 'react-firebase-hooks/firestore'

import Typography from '@material-ui/core/Typography'

import { Container, Grid } from '@material-ui/core'

const BookList = () => {
  const booksRef = firestore.collection('books')
  const query = booksRef.orderBy('createdAt')

  const [books] = useCollectionData(query, { idField: 'id' })

  return (
    <div>
      <Grid container style={{ padding: 12 }}>
        <Grid item xs={12}>
          <Typography variant='h3'>Book List</Typography>
        </Grid>
        <Grid item xs={12}>
          {books &&
            books.map(book => {
              return (
                <Grid container spacing={3}>
                  <Grid item xs={2}>
                    <img
                      src={book.coverImage}
                      alt={`Book cover`}
                      style={{ height: 100, margin: 'auto' }}
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <Typography>{book.bookName}</Typography>
                  </Grid>
                </Grid>
              )
            })}
        </Grid>
      </Grid>
    </div>
  )
}

export default BookList
