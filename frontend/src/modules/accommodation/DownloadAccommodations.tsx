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
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import useDrawer from '../../hooks/useDrawer'

interface IProps {
  children?: React.ReactNode
}

const DownloadAccommodations: React.FC<IProps> = () => {
  // hooks
  const { open: openDialog, toggleDialog } = useDialog()
  const { open: openDrawer, toggleDrawer } = useDrawer()
  const accommodations: IAccommodation[] = [] // TODO: PM'S job

  // state
  const [fields, setFields] = React.useState<IDownloadAccommodation>({
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

  // events
  const handleDownload = () => {
    // TODO: PM's job
  }

  // immediates
  const downloadFields: IDownloadAccommodationField[] = [
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

  return (
    <React.Fragment>
      <Button variant="contained" onClick={toggleDialog}>
        Download
      </Button>
      {openDialog && (
        <Dialog open={openDialog} onClose={toggleDialog} sx={mainDialog}>
          <DialogTitle>
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

          <DialogContent>
            {/* Which fields to include */}
            <Drawer
              sx={drawerStyle}
              PaperProps={{
                style: {
                  position: 'absolute',
                },
              }}
              variant="persistent"
              anchor="left"
              open={openDrawer}
            >
              <div>
                <IconButton onClick={toggleDrawer}>
                  <ChevronLeftIcon />
                </IconButton>
              </div>
              <Divider />
              {/* show which fields to preview */}
              <div style={filterListStyle}>
                {downloadFields.map(field => (
                  <div key={field}>
                    <FormControlLabel
                      label={field}
                      control={
                        <Checkbox
                          checked={fields[field]}
                          sx={{ individualFilterStyle }}
                          onChange={(e, checked) => {
                            const newFields = { ...fields }
                            newFields[field] = checked
                            setFields(newFields)
                          }}
                        />
                      }
                    />
                  </div>
                ))}
              </div>
            </Drawer>

            {/* Preview table */}
            <TableContainer>
              <Table id="accomm-table">
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

const mainDialog = {
  '& .MuiPaper-root': {
    maxWidth: '100%',
    width: '100%',
    height: '100%',
  },
}

const drawerStyle = {
  width: '20%',
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: '20%',
    boxSizing: 'border-box',
  },
}

const filterListStyle = {
  padding: '10px',
  flexGrow: '1',
}

const individualFilterStyle = {
  '& .MuiCheckbox-root': {
    paddingBottom: '5px',
  },
}
