import { Box, FormControlLabel, Checkbox, useTheme } from '@mui/material'
import React from 'react'

interface IProps {
  children?: React.ReactNode
  downloadFields: IDownloadAccommodationsField[]
  tableHeaders: any // TODO: use Imap
  fields: IDownloadAccommodations
  setFields: React.Dispatch<React.SetStateAction<IDownloadAccommodations>>
}

const DownloadAccommodationsIncludeFields: React.FC<IProps> = ({
  downloadFields,
  tableHeaders,
  fields,
  setFields,
}) => {
  const theme = useTheme()
  return (
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
                  if (field === 'name') return
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
  )
}

export default DownloadAccommodationsIncludeFields
