import React, { useState, ChangeEvent } from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton/IconButton'
import { PhotoCamera } from '@mui/icons-material'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Autocomplete from '@mui/material/Autocomplete'
import Chip from '@mui/material/Chip'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Switch from '@mui/material/Switch'
import { useNavigate } from 'react-router-dom'
import { retrieveAccommodations } from '../../store/accommodation/actions'
import clsx from 'clsx'

export function BasicInputFields(props: any) {
  return (
    <div>
      <TextField
        margin="normal"
        required
        fullWidth
        id="listingName"
        label="Listing name"
        name="listingName"
        autoComplete="listingName"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="unitSz"
        label="Unit size"
        name="unitSz"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="numBedRm"
        label="Number of bedrooms"
        name="numberOfBedrooms"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="numBed"
        label="Number of Beds"
        name="numBed"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="minCap"
        label="Minimum capacity"
        name="minCap"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="maxCap"
        label="Maximum capacity"
        name="maxCap"
      />
      {/*Furnishing*/}
      <Autocomplete
        multiple
        id="furnishing"
        limitTags={2}
        options={[]}
        defaultValue={[]}
        freeSolo
        renderTags={(value: readonly string[], getTagProps) =>
          value.map((option: string, index: number) => (
            // eslint-disable-next-line react/jsx-key
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={params => (
          <TextField
            {...params}
            margin="normal"
            required
            variant="outlined"
            label="Furnishing"
            placeholder="Add furnishing"
          />
        )}
      />
      {/*Furnishing*/}
      <TextField
        margin="normal"
        required
        fullWidth
        id="listingPrice"
        label="Listing price"
        name="listingPrice"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        multiline
        id="desc"
        label="Description"
        name="desc"
      />
    </div>
  )
}
