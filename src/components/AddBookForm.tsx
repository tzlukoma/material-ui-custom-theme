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

interface AddBookFormProps {
  isDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}

interface BookSubmission {
  author: string,
  title: string,
  gender: string,
  ageRange: string,
  genderCategoryId: number,
  ageRangeCategoryId: number,
  sku: string,
  coverImage: string,
  stockCount: number,
  weight: number,
  length: number,
  width: number,
  height: number,
  amountBought: number,
  datePurchased: string,
  retailPrice: number,
  regularPrice: string
}

interface BookCount {
  booksCount: number
}




const schema = Yup.object().shape({
  title: Yup.string().required(`Please enter the name of the book`),
  format: Yup.string().required(`Please select a format`),
  author: Yup.string().required(`Please enter the author's name`),
  gender: Yup.string().required(`Please select a gender`),
  ageRange: Yup.string().required(`Please select an age range`),
  description: Yup.string(),
  weight: Yup.number().typeError(`Please enter a number`)
    .positive('Please enter a positive number')
    .integer('Please enter a number')
    .required(`The book's weight is required`),
  length: Yup.number().typeError(`Please enter a number`)
    .positive('Please enter a positive number')
    .integer('Please enter a number')
    .required(`The book's length is required`),
  width: Yup.number().typeError(`Please enter a number`)
    .positive('Please enter a positive number')
    .integer('Please enter a number')
    .required(`The book's width is required`),
  height: Yup.string().required(`The book's height is required`),
  retailPrice: Yup.string()
    .required('Amount bought is required'),
  purchasePrice: Yup.string()
    .required('Amount bought is required'),
  datePurchased: Yup.date().typeError(`Please enter a date`),
  amountBought: Yup.number().typeError(`Please enter a number`)
    .positive('Please enter a positive number')
    .integer('Please enter a number')
    .required('Amount bought is required')
})

const AddBookForm = ({ isDialogOpen }: AddBookFormProps) => {
  const classes = useStyles()

  const { register, handleSubmit, control, errors } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur'
  })

  const [coverImageUrl, setCoverImageUrl] = useState(``)

  const bookStatsRef = firestore.collection('books').doc('--stats--')

  const [bookStats] = useDocumentData<BookCount>(bookStatsRef, { idField: 'id' })

  const increment = app.firestore.FieldValue.increment(1)

  const onFileChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined = e => {
    const file: File | null = e.target.files && e.target.files[0]

    const storageRef = storage.ref()

    if (file) {
      const fileRef = storageRef.child(file.name)
      fileRef && fileRef.put(file).then(() => {
        console.log(`file uploaded`)
        storage
          .ref(file.name)
          .getDownloadURL()
          .then(url => {
            setCoverImageUrl(url)
          })
      })
    } else {
      return
    }

  }
  const genderMap: any = {
    [`Boys`]: { id: 33, value: 'B' },
    [`Girls`]: { id: 31, value: 'G' },
    [`Both`]: { id: 35, value: 'E' }
  }
  const ageRangeMap: any = {
    '0-3': { id: 36, value: '03' },
    '4-6': { id: 29, value: '46' },
    '7-9': { id: 34, value: '79' },
    'Over 10': { id: 32, value: '10' }
  }
  const generateSku = (gender: string, ageRange: string, currentStockNumber: string) => {
    const genderPortion = genderMap[gender].value
    const ageRangePortion = ageRangeMap[ageRange].value
    const leadingNumber = currentStockNumber.padStart(5, '0')

    return genderPortion + ageRangePortion + leadingNumber
  }

  const onSubmit = async (submitData: BookSubmission) => {
    const currentBookCount: number = (bookStats && bookStats.booksCount) || 0
    console.log(`genderMap`, genderMap[submitData['gender']].id)
    const genderCategoryId: number = genderMap[submitData['gender']].id
    const ageRangeCategoryId: number = ageRangeMap[submitData['ageRange']].id

    const newSku = generateSku(
      submitData['gender'],
      submitData['ageRange'],
      currentBookCount.toString()
    )

    const computedSalePrice = Math.ceil(submitData[`retailPrice`]) / 1.06625
    const roundedSalePrice = computedSalePrice.toFixed(2)
    console.log(`computedSalePrice`, computedSalePrice)
    console.log(`roundedSalePrice`, roundedSalePrice)

    submitData['genderCategoryId'] = genderCategoryId
    submitData['ageRangeCategoryId'] = ageRangeCategoryId
    submitData['sku'] = newSku
    submitData['coverImage'] = coverImageUrl
    submitData['stockCount'] = submitData['amountBought']
    submitData['regularPrice'] = roundedSalePrice.toString()


    const booksRef = firestore.collection('books').doc(submitData['sku'])

    await booksRef.set({
      ...submitData,
      createdAt: app.firestore.FieldValue.serverTimestamp()
    })

    await bookStatsRef.update({ booksCount: increment })

    console.log(submitData)
    isDialogOpen(false)
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
            <Grid item xs={12} sm={6} lg={4}>
              <FormControl className={classes.formControl}>
                <TextField
                  name='title'
                  id='title'
                  label='Book Name'
                  variant='outlined'
                  inputRef={register}
                  error={!!errors.title}
                  helperText={errors?.title?.message}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
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
            <Grid item xs={12} sm={6} lg={2}>
              <FormControl variant='outlined' className={classes.formControl} >
                <InputLabel>Gender</InputLabel>
                <Controller
                  name='gender'
                  control={control}
                  helperText={errors?.gender?.message}
                  as={
                    <Select
                      label='Gender'
                      error={!!errors.gender}


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
            <Grid item xs={12} sm={6} lg={2}>
              <FormControl variant='outlined' className={classes.formControl}>
                <InputLabel>Age</InputLabel>
                <Controller
                  name='ageRange'
                  control={control}
                  helpertext={errors?.ageRange?.message}
                  as={
                    <Select
                      label='Age Range'
                      error={!!errors.ageRange}

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

          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={4}>
              <FormControl variant='outlined' className={classes.formControl}>
                <InputLabel>Format</InputLabel>
                <Controller
                  name='format'
                  control={control}
                  helpertext={errors?.format?.message}
                  as={
                    <Select
                      label='Format'
                      error={!!errors.format}

                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={`Paperback`}>Paperback</MenuItem>
                      <MenuItem value={`Hardcover`}>Hardcover</MenuItem>
                    </Select>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} lg={2}>
              <FormControl className={classes.formControl}>
                <TextField
                  name='weight'
                  label='Weight'
                  variant='outlined'
                  inputRef={register}
                  error={!!errors.weight}
                  helperText={errors?.weight?.message}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} lg={2}>
              <FormControl className={classes.formControl}>
                <TextField
                  name='length'
                  label='Length'
                  variant='outlined'
                  inputRef={register}
                  error={!!errors.length}
                  helperText={errors?.length?.message}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} lg={2}>
              <FormControl className={classes.formControl}>
                <TextField
                  name='width'
                  label='Width'
                  variant='outlined'
                  inputRef={register}
                  error={!!errors.width}
                  helperText={errors?.width?.message}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} lg={2}>
              <FormControl className={classes.formControl}>
                <TextField
                  name='height'
                  label='Height'
                  variant='outlined'
                  inputRef={register}
                  error={!!errors.height}
                  helperText={errors?.height?.message}
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
                  rows={8}
                  inputRef={register}
                  error={!!errors.description}
                  helperText={errors?.description?.message}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl className={classes.formControl}>
                <TextField
                  name='retailPrice'
                  label='Retail price'
                  variant='outlined'
                  inputRef={register}
                  error={!!errors.retailPrice}
                  helperText={errors?.retailPrice?.message}
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
                  error={!!errors.purchasePrice}
                  helperText={errors?.purchasePrice?.message}
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
                  error={!!errors.datePurchased}
                  helperText={errors?.datePurchased?.message}
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
                  error={!!errors.amountBought}
                  helperText={errors?.amountBought?.message}
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

export default AddBookForm
