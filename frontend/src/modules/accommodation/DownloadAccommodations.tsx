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
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import useDrawer from '../../hooks/useDrawer'
import { downloadPdf } from '../../store/report/actions'
import { retrieveAccommodations } from './AccommodationsProvider'

interface IProps {
  children?: React.ReactNode
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
  const tableHeaders = {
    'name': 'Name',
    'type': 'Type',
    'price': 'Price',
    'size_sqm': 'Size (sqm)',
    'meters_from_uplb': 'Distance from UPLB',
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
          },
        }}>
          <DialogTitle
            sx={{
              '&.MuiTypography-root': {
                color: theme.palette.primary.main,
              }
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
                  }
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
                <TableHead>
                  <TableRow>
                    {Object.entries(fields as object)
                      .filter(field => field[1])
                      .map(field => (
                        <TableCell key={field[0]}>{field[0]}</TableCell>
                      ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {accommodations.map(accommodation => (
                    <TableRow key={accommodation._id}>
                      {fields.name && (
                        <TableCell>{accommodation.name}</TableCell>
                      )}
                      {fields.type && (
                        <TableCell>{accommodation.type}</TableCell>
                      )}
                      {fields.price && (
                        <TableCell>{accommodation.price}</TableCell>
                      )}
                      {fields.size_sqm && (
                        <TableCell>{accommodation.size_sqm}</TableCell>
                      )}
                      {fields.meters_from_uplb && (
                        <TableCell>{accommodation.meters_from_uplb}</TableCell>
                      )}
                      {fields.min_pax && (
                        <TableCell>{accommodation.min_pax}</TableCell>
                      )}
                      {fields.max_pax && (
                        <TableCell>{accommodation.max_pax}</TableCell>
                      )}
                      {fields.num_rooms && (
                        <TableCell>{accommodation.num_rooms}</TableCell>
                      )}
                      {fields.num_beds && (
                        <TableCell>{accommodation.num_beds}</TableCell>
                      )}
                      {fields.furnishing && (
                        <TableCell>{accommodation.furnishing}</TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>

          <DialogActions>
            {/* Action buttons */}
            <Button onClick={handleDownload}>Save PDF</Button>
            <Button onClick={toggleDialog}>Cancel</Button>
          </DialogActions>
        </Dialog>
      )}
    </React.Fragment>
  )
}

export default DownloadAccommodations