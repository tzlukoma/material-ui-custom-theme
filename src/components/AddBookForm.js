import React from 'react'
import { useForm, Controller } from 'react-hook-form'

import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
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
    width: '90%',
    margin: 'auto',
    display: 'block'
  }
}))

export default function AddBookForm () {
  const classes = useStyles()

  const { register, handleSubmit, control } = useForm()

  return (
    <form
      noValidate
      autoComplete='off'
      className={classes.formContainer}
      onSubmit={handleSubmit(data => {
        data['sku'] = 'No SKU'
        console.log(data)
      })}
    >
      <Grid container>
        <Grid item xs={12} md={8}>
          <Grid container alignItems='flex-start' spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControl className={classes.formControl}>
                <TextField
                  name='bookName'
                  label='Book Name'
                  variant='outlined'
                  inputRef={register}
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
                    <Select label='Gender'>
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
                    <Select label='Age Range' inputRef={register}>
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
            <Grid item xs={12} lg={3}>
              <FormControl className={classes.formControl}>
                <TextField
                  name='sku'
                  label='SKU'
                  variant='outlined'
                  disabled
                  helperText='Please generate a SKU' //make this conditional to whether there is a sku or not
                  inputRef={register}
                />
              </FormControl>
            </Grid>{' '}
            <Grid item xs={12} lg={3}>
              <Button variant='contained' size='large' color='secondary'>
                Generate SKU
              </Button>
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
            <Grid item xs={12}>
              <label htmlFor='upload-photo'>
                <input
                  style={{ display: 'none' }}
                  id='upload-photo'
                  name='upload-photo'
                  type='file'
                />

                <Button
                  color='secondary'
                  variant='contained'
                  component='span'
                  style={{ marginBottom: 20 }}
                >
                  Upload Cover Picture
                </Button>
              </label>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <div style={{ maxWidth: '100%', padding: '0 20px' }}>
            <img
              className={classes.coverImg}
              src={`http://lorempixel.com/300/400`}
              alt={`Book cover`}
            />
          </div>
        </Grid>
        <Grid item xs={8} style={{ marginTop: 20 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={4}>
              <FormControl className={classes.formControl}>
                <TextField
                  name='purchasePrice'
                  label='Purchase price'
                  variant='outlined'
                  inputRef={register}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={4}>
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
            <Grid item xs={12} lg={4}>
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
      </Grid>

      <Button
        type='submit'
        color='primary'
        variant='contained'
        size='large'
        style={{ marginTop: 20 }}
      >
        Add Book to Inventory
      </Button>
    </form>
  )
}
