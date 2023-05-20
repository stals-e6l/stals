import React, {useEffect, useState} from 'react'
import useDialog from '../../hooks/useDialog'
import {
  Dialog,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  DialogTitle,
  DialogContent,
  Divider,
  DialogActions,
  Button,
  Box,
  Typography,
  Menu,
  IconButton,
} from '@mui/material'
import { DataGrid, GridValueGetterParams } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close';

import { NumericFormat } from 'react-number-format'
import { downloadPdf } from '../../store/report/actions'
import { retrieveAccommodations } from './AccommodationsProvider'
import DownloadAccommodationsIncludeFields from './DownloadAccommodationsIncludeFields'
import useMenu from '../../hooks/useMenu'

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
  const { anchorEl, onClose, onOpen } = useMenu()
  const accommodations = retrieveAccommodations()
  const [data, setData] = useState([])

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

  const columns = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "type", headerName: "Type", width: 150 },
    { field: "price", headerName: "Price", width: 150 },
    { field: "size_sqm", headerName: "Room Size", width: 150 },
    { field: "meters_from_uplb", headerName: "Distance from UPLB", width: 150 },
    { field: "min_pax", headerName: "Minimum Tenants", width: 150 },
    { field: "max_pax", headerName: "Minimum Tenants", width: 150 },
    { field: "num_rooms", headerName: "Number of Rooms", width: 150 },
    { field: "num_beds", headerName: "Number of Beds", width: 150 },
    { field: "furnishing", headerName: "Furnishing Type", width: 150 },
  ];

  const gridRows = accommodations ? accommodations.map((accommodations) => {
    return{
      id: accommodations._id,
      name: accommodations.name,
      type: accommodations.type,
      price: accommodations.price,
      size_sqm: accommodations.size_sqm,
      maters_from_uplb: accommodations.meters_from_uplb,
      min_pax: accommodations.min_pax,
      max_pax: accommodations.max_pax,
      num_rows: accommodations.num_rooms,
      num_beds: accommodations.num_beds,
      furnishing: furnishing[accommodations.furnishing],
    }
  }) : []

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
      .finally(() => {
        setFields({
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
            {/* <DialogTitle
                sx={{
                  '&.MuiTypography-root': {
                    color: theme.palette.primary.main,
                  },
                }}
              >
                PDF Preview
              </DialogTitle> */}
            <Box sx={{
              display: 'inline-flex',
              justifyContent: 'space-between',
              paddingRight: theme.spacing(2),
              paddingLeft: theme.spacing(1),
            }}>
              <DialogTitle
                sx={{
                  '&.MuiTypography-root': {
                    color: theme.palette.primary.main,
                  },
                }}
              >
                PDF Preview
              </DialogTitle>
              <IconButton onClick={toggleDialog}>
                <CloseIcon
                  sx={{
                    color: theme.palette.primary.main,
                    marginRight: theme.spacing(),
                  }}
                />
              </IconButton>
            </Box>
            

            <Divider />

            <DialogContent>
              <Box>
                <Button onClick={onOpen} variant="text">
                  <MenuIcon
                    sx={{
                      color: theme.palette.secondary.main,
                      marginRight: theme.spacing(),
                    }}
                  />
                  Include fields
                </Button>
              </Box>
              {/* Which fields to include */}
              <Menu
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={onClose}
              >
                <DownloadAccommodationsIncludeFields
                  downloadFields={downloadFields}
                  tableHeaders={tableHeaders}
                  fields={fields}
                  setFields={setFields}
                />
              </Menu>

              {/* Preview table */}
              <Box>
                {/* <TableContainer>
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
                </TableContainer> */}
                <DataGrid 
                  rows={gridRows}
                  columns={columns}
                />
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
