import {
  Checkbox,
  Dialog,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import React from 'react'

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
    <Dialog open={show} onClose={onClose}>
      {/* show which fields to preview */}
      <div>
        {allFields.map(field => (
          <div key={field}>
            <InputLabel>{field}</InputLabel>
            <Checkbox
              checked={fields[field]}
              onChange={(e, checked) => {
                const newFields = { ...fields }
                newFields[field] = checked
                setFields(newFields)
              }}
            />
          </div>
        ))}
      </div>

      {/* actual preview */}
      <TableContainer>
        <Table>
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
    </Dialog>
  )
}

export default PreviewAccommodations
