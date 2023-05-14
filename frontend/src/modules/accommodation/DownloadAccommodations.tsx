import React from 'react'
import useDialog from '../../hooks/useDialog'
import {
  Checkbox,
  Dialog,
  Drawer,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  DialogTitle,
  IconButton,
  DialogContent,
  Divider,
  FormControlLabel,
  DialogActions,
  Button,
  Box,
  Typography,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import useDrawer from '../../hooks/useDrawer'
import Pluralize from 'react-pluralize'
import { NumericFormat } from 'react-number-format'
import { downloadPdf } from '../../store/report/actions'
import { retrieveAccommodations } from './AccommodationsProvider'

interface IProps {
  children?: React.ReactNode
}

interface header {
  [key: string]: string
}

const DownloadAccommodations: React.FC<IProps> = () => {
  // hooks
  const theme = useTheme()
  const { open: openDialog, toggleDialog } = useDialog()
  const { open: openDrawer, toggleDrawer } = useDrawer()
  const accommodations = retrieveAccommodations()

  // state
  const [fields, setFields] = React.useState<IDownloadAccommodations>({
    name: true,
    type: true,
    price: true,
    size_sqm: true,
    meters_from_uplb: true,
    min_pax: true,
    max_pax: true,
    num_rooms: true,
    num_beds: true,
    furnishing: true,
  })

  // immediates
  const tableId = 'accommodations-table'
  const tableHeaders: header = {
    name: 'Name',
    type: 'Type',
    price: 'Price',
    size_sqm: 'Room Size',
    meters_from_uplb: 'Distance from UPLB',
    min_pax: 'Minimum Tenants',
    max_pax: 'Maximum Tenants',
    num_rooms: 'Number of Rooms',
    num_beds: 'Number of Beds',
    furnishing: 'Furnishing Type ',
  }
  const accommType: header = {
    hotel: 'Hotel',
    apartment: 'Apartment',
    bedspace: 'Bedspace',
    dormitory: 'Dormitory',
    transient: 'Transient',
  }
  const furnishing: header = {
    unfurnished: 'Unfurnished',
    semifurnished: 'Semi-furnished',
    fully_furnished: 'Fully Furnished',
  }
  const downloadFields: IDownloadAccommodationsField[] = [
    'name',
    'type',
    'price',
    'size_sqm',
    'meters_from_uplb',
    'min_pax',
    'max_pax',
    'num_rooms',
    'num_beds',
    'furnishing',
  ]

  // events
  const handleDownload = () => {
    downloadPdf(`#${tableId}`)
      .then(() => {
        toggleDialog()
      })
      .catch(err => {
        // TODO: PM's job (track error)
        console.error(err)
      })
  }

  return (
    <React.Fragment>
      <Button
        disabled={!accommodations}
        variant="contained"
        onClick={toggleDialog}
      >
        Download
      </Button>

      {openDialog && accommodations && (
        <Box>
          <Dialog
            fullScreen
            open={openDialog}
            onClose={toggleDialog}
            sx={{
              '& .MuiPaper-root': {
                [theme.breakpoints.up('md')]: {
                  maxWidth: '90%',
                  width: '90%',
                  height: '85%',
                  borderRadius: theme.spacing(2),
                },
                [theme.breakpoints.down('sm')]: {
                  width: '100vw',
                  height: '100vh',
                },
              },
            }}
          >
            <DialogTitle
              sx={{
                '&.MuiTypography-root': {
                  color: theme.palette.primary.main,
                },
              }}
            >
              {/* Button to open Drawer */}
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={toggleDrawer}
              >
                <MenuIcon />
              </IconButton>
              PDF Preview
            </DialogTitle>

            <Divider />

            <DialogContent>
              {/* Which fields to include */}
              <Drawer
                sx={{
                  flexShrink: 0,
                  '& .MuiDrawer-paper': {
                    width: { sm: '50%', md: '30%', lg: '20%', xl: '20%' },
                    maxWidth: '100%',
                    height: '100%',
                    boxSizing: 'border-box',
                    borderRadius: theme.spacing(0),
                  },
                }}
                PaperProps={{
                  style: {
                    position: 'absolute',
                  },
                }}
                variant="persistent"
                anchor="left"
                open={openDrawer}
              >
                <Box
                  sx={{
                    display: 'inline-flex',
                    paddingTop: theme.spacing(1),
                    paddingBottom: theme.spacing(1),
                    paddingLeft: theme.spacing(1.2),
                  }}
                >
                  <IconButton onClick={toggleDrawer}>
                    <ChevronLeftIcon
                      style={{
                        color: theme.palette.primary.main,
                      }}
                    />
                  </IconButton>
                  <DialogTitle
                    sx={{
                      '&.MuiTypography-root': {
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    Filters
                  </DialogTitle>
                </Box>
                <Divider />
                {/* show which fields to preview */}
                <Box
                  sx={{
                    padding: theme.spacing(1.25),
                    paddingLeft: theme.spacing(2.5),
                    flexGrow: '1',
                  }}
                >
                  {downloadFields.map(field => (
                    <Box key={field}>
                      <FormControlLabel
                        label={tableHeaders[field]}
                        control={
                          <Checkbox
                            checked={fields[field]}
                            sx={{
                              '&.Mui-checked': {
                                color: theme.palette.secondary.main,
                              },
                              '&.MuiButtonBase-root': {
                                paddingTop: theme.spacing(0.5),
                                paddingBottom: theme.spacing(0.5),
                              },
                            }}
                            onChange={(e, checked) => {
                              const newFields = { ...fields }
                              newFields[field] = checked
                              setFields(newFields)
                            }}
                          />
                        }
                      />
                    </Box>
                  ))}
                </Box>
              </Drawer>

              {/* Preview table */}
              <Box
                sx={{
                  display: {
                    xs: 'none',
                    sm: 'block',
                    md: 'block',
                    lg: 'block',
                    xl: 'block',
                  },
                }}
              >
                <TableContainer>
                  <Table id={tableId}>
                    <TableHead
                      sx={{
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <TableRow>
                        {Object.entries(fields as object)
                          .filter(field => field[1])
                          .map(field => (
                            <TableCell
                              key={field[0]}
                              sx={{ textAlign: 'center' }}
                            >
                              <Typography
                                variant="h6"
                                sx={{
                                  color: theme.palette.primary.main,
                                  fontSize: theme.spacing(2),
                                }}
                              >
                                {tableHeaders[field[0]]}
                              </Typography>
                            </TableCell>
                          ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {accommodations.map(accommodation => (
                        <TableRow key={accommodation._id}>
                          {fields.name && (
                            <TableCell sx={{ textAlign: 'center' }}>
                              {accommodation.name}
                            </TableCell>
                          )}
                          {fields.type && (
                            <TableCell sx={{ textAlign: 'center' }}>
                              {accommType[accommodation.type]}
                            </TableCell>
                          )}
                          {fields.price && (
                            <TableCell
                              sx={{ textAlign: 'center', whiteSpace: 'nowrap' }}
                            >
                              <NumericFormat
                                displayType="text"
                                value={accommodation.price}
                                prefix={'₱ '}
                                thousandSeparator=","
                              />
                            </TableCell>
                          )}
                          {fields.size_sqm && (
                            <TableCell
                              sx={{ textAlign: 'center', whiteSpace: 'nowrap' }}
                            >
                              <NumericFormat
                                displayType="text"
                                value={accommodation.size_sqm}
                                thousandSeparator=","
                                suffix={' sqm.'}
                              />
                            </TableCell>
                          )}
                          {fields.meters_from_uplb && (
                            <TableCell
                              sx={{ textAlign: 'center', whiteSpace: 'nowrap' }}
                            >
                              <NumericFormat
                                displayType="text"
                                value={accommodation.meters_from_uplb}
                                thousandSeparator=","
                                suffix={' meters'}
                              />
                            </TableCell>
                          )}
                          {fields.min_pax && (
                            <TableCell sx={{ textAlign: 'center' }}>
                              <Pluralize
                                singular={'tenant'}
                                plural={'tenants'}
                                count={accommodation.min_pax}
                              />
                            </TableCell>
                          )}
                          {fields.max_pax && (
                            <TableCell sx={{ textAlign: 'center' }}>
                              <Pluralize
                                singular={'tenant'}
                                plural={'tenants'}
                                count={accommodation.max_pax}
                              />
                            </TableCell>
                          )}
                          {fields.num_rooms && (
                            <TableCell sx={{ textAlign: 'center' }}>
                              <Pluralize
                                singular={'room'}
                                plural={'rooms'}
                                count={accommodation.num_rooms}
                              />
                            </TableCell>
                          )}
                          {fields.num_beds && (
                            <TableCell sx={{ textAlign: 'center' }}>
                              <Pluralize
                                singular={'bed'}
                                plural={'beds'}
                                count={accommodation.num_beds}
                              />
                            </TableCell>
                          )}
                          {fields.furnishing && (
                            <TableCell sx={{ textAlign: 'center' }}>
                              {furnishing[accommodation.furnishing]}
                            </TableCell>
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </DialogContent>

            <DialogActions
              sx={{
                paddingRight: theme.spacing(4.5),
                paddingBottom: theme.spacing(1.5),
              }}
            >
              {/* Action buttons */}
              <Button variant="contained" onClick={handleDownload}>
                Save PDF
              </Button>
              <Button variant="outlined" onClick={toggleDialog}>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </React.Fragment>
  )
}

export default DownloadAccommodations
