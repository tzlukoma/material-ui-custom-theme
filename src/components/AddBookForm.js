import React from 'react'
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
  }
}))

export default function AddBookForm () {
  const classes = useStyles()

  return (
    <form noValidate autoComplete='off' style={{ padding: 12 }}>
      <Grid container>
        <Grid item xs={12} md={8}>
          <Grid container alignItems='flex-start' spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControl style={{ width: '100%' }}>
                <TextField
                  id='outlined-basic'
                  label='Book Name'
                  variant='outlined'
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl style={{ width: '100%' }}>
                <TextField
                  id='outlined-basic'
                  label='Author'
                  variant='outlined'
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={3}>
              <FormControl
                variant='outlined'
                className={classes.formControl}
                style={{ width: '100%' }}
              >
                <InputLabel id='demo-simple-select-outlined-label'>
                  Gender
                </InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  label='Gender'
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={`Boys`}>Boys</MenuItem>
                  <MenuItem value={`Girls`}>Girls</MenuItem>
                  <MenuItem value={`Both`}>Both</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <FormControl
                variant='outlined'
                className={classes.formControl}
                style={{ width: '100%' }}
              >
                <InputLabel id='demo-simple-select-outlined-label'>
                  Age
                </InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  label='Age Range'
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={`0-3`}>0 to 3</MenuItem>
                  <MenuItem value={`4-6`}>4 to 6</MenuItem>
                  <MenuItem value={`7-9`}>7 to 9</MenuItem>
                  <MenuItem value={`Over 10`}>Over 10</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={3}>
              <FormControl style={{ width: '100%' }}>
                <TextField
                  id='outlined-basic'
                  label='SKU'
                  variant='outlined'
                  disabled
                  helperText='Please generate a SKU' //make this conditional to whether there is a sku or not
                />
              </FormControl>
            </Grid>{' '}
            <Grid item xs={12} lg={3}>
              <Button variant='contained' size='large' color='secondary'>
                Generate SKU
              </Button>
            </Grid>
            <Grid item xs={12}>
              <FormControl style={{ width: '100%' }}>
                <TextField
                  id='outlined-basic'
                  label='Description'
                  variant='outlined'
                  multiline
                  rows={4}
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
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                display: 'block'
              }}
              src={`http://lorempixel.com/300/400`}
              alt={`the book`}
            />
          </div>
        </Grid>
        <Grid item xs={8} style={{ marginTop: 20 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={4}>
              <FormControl>
                <TextField
                  id='outlined-basic'
                  label='Purchase price'
                  variant='outlined'
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={4}>
              <FormControl>
                <TextField
                  id='outlined-basic'
                  label='Date purchased'
                  type='date'
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={4}>
              <FormControl>
                <TextField
                  id='outlined-basic'
                  label='Amount bought'
                  variant='outlined'
                />
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Button
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
