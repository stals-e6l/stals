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
  useTheme,
  Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import useDrawer from '../../hooks/useDrawer'
import { NumericFormat } from 'react-number-format'
import { downloadPdf } from '../../store/report/actions'
import { retrieveAccommodations } from './AccommodationsProvider'

interface IProps {
  children?: React.ReactNode
}

interface header {
  [key: string]: string;
}

const DownloadAccommodations: React.FC<IProps> = () => {
  // hooks
  const { open: openDialog, toggleDialog } = useDialog()
  const { open: openDrawer, toggleDrawer } = useDrawer()
  const accommodations = retrieveAccommodations()
  const theme = useTheme()

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
  const tableHeaders : header = {
    'name': 'Name',
    'type': 'Type',
    'price': 'Price (₱)',
    'size_sqm': 'Size (sqm)',
    'meters_from_uplb': 'Distance from UPLB (km)',
    'min_pax': 'Minimum Tenants',
    'max_pax': 'Maximum Tenants',
    'num_rooms': 'Number of Rooms',
    'num_beds': 'Number of Beds',
    'furnishing': 'Furnishing Type ', 
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
        <Dialog open={openDialog} onClose={toggleDialog} 
          sx={{
          '& .MuiPaper-root': {
            maxWidth: '90%',
            width: '90%',
            height: '85%',
            borderRadius: theme.spacing(2),
          },
          
        }}>
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
                width: '20%',
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: '20%',
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
              <Box sx={{
                display: 'inline-flex',
                paddingTop: theme.spacing(1),
                paddingBottom: theme.spacing(1),
              }}>
                <IconButton onClick={toggleDrawer}>
                  <ChevronLeftIcon style={{
                    color: theme.palette.primary.main,
                  }} />
                </IconButton>
                <DialogTitle sx={{ 
                  '&.MuiTypography-root': {
                    color: theme.palette.primary.main,
                  }, 
                 }}>
                  Filters
                </DialogTitle>
              </Box>
              <Divider />
              {/* show which fields to preview */}
              <Box sx={{
                padding: theme.spacing(1.25),
                flexGrow: '1',
              }}>
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
            <TableContainer>
              <Table id={tableId}>
                <TableHead sx={{
                  whiteSpace: 'nowrap',
                }}>
                  <TableRow>
                    {Object.entries(fields as object)
                      .filter(field => field[1])
                      .map(field => (
                        <TableCell key={field[0]} sx={{textAlign: 'center'}}>
                          <Typography variant='h6' sx={{
                            color: theme.palette.primary.main,
                            fontSize: theme.spacing(2),
                          }}>
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
                        <TableCell sx={{textAlign: 'center'}}>{accommodation.name}</TableCell>
                      )}
                      {fields.type && (
                        <TableCell sx={{textAlign: 'center'}}>{accommodation.type}</TableCell>
                      )}
                      {fields.price && (
                        <TableCell sx={{textAlign: 'center'}}><NumericFormat displayType='text' value={accommodation.price} thousandSeparator=","/></TableCell>
                      )}
                      {fields.size_sqm && (
                        <TableCell sx={{textAlign: 'center'}}><NumericFormat displayType='text' value={accommodation.size_sqm} thousandSeparator=","/></TableCell>
                      )}
                      {fields.meters_from_uplb && (
                        <TableCell sx={{textAlign: 'center'}}><NumericFormat displayType='text' value={accommodation.meters_from_uplb} thousandSeparator=","/></TableCell>
                      )}
                      {fields.min_pax && (
                        <TableCell sx={{textAlign: 'center'}}><NumericFormat displayType='text' value={accommodation.min_pax} suffix={accommodation.min_pax > 1 ? ' tenants': ' tenant'}/></TableCell>
                      )}
                      {fields.max_pax && (
                        <TableCell sx={{textAlign: 'center'}}><NumericFormat displayType='text' value={accommodation.max_pax} suffix={accommodation.max_pax > 1 ? ' tenants': ' tenant'}/></TableCell>
                      )}
                      {fields.num_rooms && (
                        <TableCell sx={{textAlign: 'center'}}><NumericFormat displayType='text' value={accommodation.num_rooms} suffix={accommodation.num_rooms > 1 ? ' rooms': ' room'}/></TableCell>
                      )}
                      {fields.num_beds && (
                        <TableCell sx={{textAlign: 'center'}}><NumericFormat displayType='text' value={accommodation.num_beds} suffix={accommodation.num_beds > 1 ? ' beds': ' bed'}/></TableCell>
                      )}
                      {fields.furnishing && (
                        <TableCell sx={{textAlign: 'center'}}>{accommodation.furnishing}</TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>

          <DialogActions sx={{
            paddingRight: theme.spacing(4.50),
            paddingBottom: theme.spacing(1.5),
          }}>
            {/* Action buttons */}
            <Button variant='contained' onClick={handleDownload}>Save PDF</Button>
            <Button variant='outlined' onClick={toggleDialog}>Cancel</Button>
          </DialogActions>
        </Dialog>
      )}
    </React.Fragment>
  )
}

export default DownloadAccommodations