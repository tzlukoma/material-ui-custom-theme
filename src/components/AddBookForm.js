import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import { app, storage, firestore } from '../base'
import { useDocumentData } from 'react-firebase-hooks/firestore'

import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Grid from '@material-ui/core/Grid'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { Button } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(3),
      width: '100ch'
    }
  },
  MuiFormControl: {
    root: {
      width: '100%'
    }
  },
  formContainer: {
    padding: 12
  },
  formControl: {
    width: '100%'
  },
  coverImg: {
    maxWidth: '50%',
    maxHeight: '40%',
    margin: 'auto',
    display: 'block'
  }
}))

const schema = Yup.object().shape({
  bookName: Yup.string().required(`Please enter the name of the book`),
  author: Yup.string().required(`Please enter the author's name`),
  gender: Yup.string().required(`Please select a gender`),
  amountBought: Yup.number('Please enter number')
    .positive('Please enter a positive number')
    .integer('Please enter a number')
    .required('Amount bought is required')
})

export default function AddBookForm ({ handleClose }) {
  const classes = useStyles()

  const { register, handleSubmit, control, errors } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur'
  })

  const [coverImageUrl, setCoverImageUrl] = useState(``)

  const bookStatsRef = firestore.collection('books').doc('--stats--')
  const booksRef = firestore.collection('books')
  const [bookStats] = useDocumentData(bookStatsRef, { idField: 'id' })

  const increment = app.firestore.FieldValue.increment(1)

  const onFileChange = e => {
    const file = e.target.files[0]

    const storageRef = storage.ref()

    const fileRef = storageRef.child(file.name)
    fileRef.put(file).then(() => {
      console.log(`file uploaded`)
      storage
        .ref(file.name)
        .getDownloadURL()
        .then(url => {
          setCoverImageUrl(url)
        })
    })
  }

  const generateSku = (gender, ageRange, currentStockNumber) => {
    const genderMap = {
      [`Boys`]: 'B',
      [`Girls`]: 'G',
      [`Both`]: 'E'
    }
    const ageRangeMap = {
      '0-3': '03',
      '4-6': '46',
      '7-9': '79',
      'Over 10': '10'
    }
    const genderPortion = genderMap[gender]
    const ageRangePortion = ageRangeMap[ageRange]
    const leadingNumber = currentStockNumber.padStart(5, '0')

    return genderPortion + ageRangePortion + leadingNumber
  }

  const onSubmit = async data => {
    const currentBookCount = bookStats && bookStats.booksCount
    data['sku'] = generateSku(
      data['gender'],
      data['ageRange'],
      currentBookCount.toString()
    )
    data['coverImage'] = coverImageUrl

    await booksRef.add({
      ...data,
      createdAt: app.firestore.FieldValue.serverTimestamp()
    })

    await bookStatsRef.update({ booksCount: increment })

    console.log(data)
    handleClose()
  }

  return (
    <form
      noValidate
      autoComplete='off'
      className={classes.formContainer}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid container>
        <Grid item xs={12} md={9}>
          <Grid container alignItems='flex-start' spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControl className={classes.formControl}>
                <TextField
                  name='bookName'
                  id='bookName'
                  label='Book Name'
                  variant='outlined'
                  inputRef={register}
                  error={!!errors.bookName}
                  helperText={errors?.bookName?.message}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl className={classes.formControl}>
                <TextField
                  name='author'
                  label='Author'
                  variant='outlined'
                  inputRef={register}
                  error={!!errors.author}
                  helperText={errors?.author?.message}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={3}>
              <FormControl variant='outlined' className={classes.formControl}>
                <InputLabel id='demo-simple-select-outlined-label'>
                  Gender
                </InputLabel>
                <Controller
                  name='gender'
                  control={control}
                  as={
                    <Select
                      label='Gender'
                      error={!!errors.gender}
                      helpertext={errors?.gender?.message}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={`Boys`}>Boys</MenuItem>
                      <MenuItem value={`Girls`}>Girls</MenuItem>
                      <MenuItem value={`Both`}>Both</MenuItem>
                    </Select>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <FormControl variant='outlined' className={classes.formControl}>
                <InputLabel>Age</InputLabel>
                <Controller
                  name='ageRange'
                  control={control}
                  as={
                    <Select
                      label='Age Range'
                      error={!!errors.ageRange}
                      helpertext={errors?.ageRange?.message}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={`0-3`}>0 to 3</MenuItem>
                      <MenuItem value={`4-6`}>4 to 6</MenuItem>
                      <MenuItem value={`7-9`}>7 to 9</MenuItem>
                      <MenuItem value={`Over 10`}>Over 10</MenuItem>
                    </Select>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <TextField
                  name='description'
                  label='Description'
                  variant='outlined'
                  multiline
                  rows={4}
                  inputRef={register}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl className={classes.formControl}>
                <TextField
                  name='purchasePrice'
                  label='Purchase price'
                  variant='outlined'
                  inputRef={register}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl className={classes.formControl}>
                <TextField
                  name='datePurchased'
                  label='Date purchased'
                  type='date'
                  InputLabelProps={{
                    shrink: true
                  }}
                  inputRef={register}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl className={classes.formControl}>
                <TextField
                  name='amountBought'
                  label='Amount bought'
                  variant='outlined'
                  inputRef={register}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <div style={{ maxWidth: '100%', padding: '20px 0px 0px' }}>
            {coverImageUrl ? (
              <img
                className={classes.coverImg}
                src={coverImageUrl}
                alt={`Book cover`}
              />
            ) : (
              <img
                className={classes.coverImg}
                src={`https://placeholder.pics/svg/200x250/FCFFC6-FFFFFF/Book%20Cover%20image`}
                alt={`Book cover`}
              />
            )}
            <div
              style={{ padding: 20, display: 'flex', justifyContent: 'center' }}
            >
              <label htmlFor='coverImage'>
                <Button
                  color='primary'
                  variant='outlined'
                  component='label'
                  style={{ marginBottom: 20 }}
                >
                  Upload Cover Image
                  <input
                    hidden
                    id='coverImage'
                    name='coverImage'
                    ref={register}
                    type='file'
                    onChange={onFileChange}
                  />
                </Button>
              </label>
            </div>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Button
            type='submit'
            color='primary'
            variant='contained'
            size='large'
            style={{ marginTop: 20 }}
          >
            Add Book to Inventory
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
