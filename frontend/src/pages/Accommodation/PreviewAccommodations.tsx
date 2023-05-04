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
import React from 'react'
import { downloadPdf } from '../../store/report/actions'

interface IProps {
  children?: React.ReactNode
  accommodations: IAccommodation[]
  show: boolean
  onClose: () => void
}

const PreviewAccommodations: React.FC<IProps> = ({
  accommodations,
  show,
  onClose,
}) => {
  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const [fields, setFields] = React.useState<any>({
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

  const allFields = [
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
    <Dialog open={show} onClose={onClose} sx={mainDialog}>
      <DialogTitle>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleDrawerOpen}
        >
          <MenuIcon />
        </IconButton>
        PDF Preview
      </DialogTitle>

      <DialogContent>
        <Drawer
          sx={drawerStyle}
          PaperProps={{
            style: {
              position: 'absolute',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <div>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          {/* show which fields to preview */}
          <div style={filterListStyle}>
            {allFields.map(field => (
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
        {/* actual preview */}
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
                  {fields.name && <TableCell>{accommodation.name}</TableCell>}
                  {fields.type && <TableCell>{accommodation.type}</TableCell>}
                  {fields.price && <TableCell>{accommodation.price}</TableCell>}
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
        <Button
          onClick={() => {
            downloadPdf('#accomm-table', {
              user_id: '6453200028b4aa4d1f5fe2bc',
              pdf_url:
                'http://github.com/stals-e6l/stals/pull/131#pullrequestreview-1412151891l',
            }).then(() => {
              onClose()
            })
          }}
        >
          Save PDF
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}

export default PreviewAccommodations

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
