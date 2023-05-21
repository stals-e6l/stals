import React from 'react'
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
  Button,
  Box,
  Typography,
  IconButton,
  Stack,
} from '@mui/material'
import { 
  DataGrid, 
  GridColDef, 
  GridValueFormatterParams, 
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  GridColumnHeaderParams,
} from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles'
import CloseIcon from '@mui/icons-material/Close'
import Pluralize from 'react-pluralize'
import { NumericFormat } from 'react-number-format'
import { downloadPdf, createReport } from '../report/ReportsProvider'
import { retrieveAccommodations } from './AccommodationsProvider'
import { getMe } from '../auth/AuthProvider'
import toSentenceCase from '../../helpers/toSentenceCase';
import useMediaQuery from '@mui/material/useMediaQuery';

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
  const accommodations = retrieveAccommodations()
  const onCreateReport = createReport()
  const me = getMe()
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

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
  // const downloadFields: IDownloadAccommodationsField[] = [
  //   'name',
  //   'type',
  //   'price',
  //   'size_sqm',
  //   'meters_from_uplb',
  //   'min_pax',
  //   'max_pax',
  //   'num_rooms',
  //   'num_beds',
  //   'furnishing',
  // ]

  const CustomNoRowsOverlay = () => (
    <img src="/no-items-found.jpg" alt="no-item" />
  );

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", align: "center", headerAlign: "center", width: 150,
      valueFormatter: (params: GridValueFormatterParams<string>) => {
        if (params.value == null) {
          return '';
        }
        return toSentenceCase(params.value);
      },
      renderHeader: (params: GridColumnHeaderParams) => (
        <Typography sx={{ color:theme.palette.primary.main, }}>
          Name
        </Typography>
      ),
    },
    { field: "type", headerName: "Type", align: "center", headerAlign: "center", width: 150,
      renderHeader: (params: GridColumnHeaderParams) => (
        <Typography sx={{ color:theme.palette.primary.main, }}>
          Type
        </Typography>
      ),
    },
    { field: "price", headerName: "Price", align: "center", headerAlign: "center", width: 150,
      valueFormatter: (params: GridValueFormatterParams<number>) => {
        if (params.value == null) {
          return '';
        }
        return `₱ ${params.value.toLocaleString('en')}`;
      },
      renderHeader: (params: GridColumnHeaderParams) => (
        <Typography sx={{ color:theme.palette.primary.main, }}>
          Price
        </Typography>
      ),
    },
    { field: "size_sqm", headerName: "Room Size", align: "center", headerAlign: "center", width: 150,
      valueFormatter: (params: GridValueFormatterParams<number>) => {
        if (params.value == null) {
          return '';
        }
        return `${params.value.toLocaleString('en')} sqm.`;
      },
      renderHeader: (params: GridColumnHeaderParams) => (
        <Typography sx={{ color:theme.palette.primary.main, }}>
          Room Size
        </Typography>
      ),
    },
    { field: "meters_from_uplb", headerName: "Distance from UPLB", align: "center", headerAlign: "center", width: 180,
      valueFormatter: (params: GridValueFormatterParams<number>) => {
        if (params.value == null) {
          return '';
        }
        return `${params.value.toLocaleString('en')} meters`;
      },
      renderHeader: (params: GridColumnHeaderParams) => (
        <Typography sx={{ color:theme.palette.primary.main, }}>
          Distance from UPLB
        </Typography>
      ),
    },
    { field: "min_pax", headerName: "Minimum Tenants", align: "center", headerAlign: "center", width: 150,
      renderHeader: (params: GridColumnHeaderParams) => (
        <Typography sx={{ color:theme.palette.primary.main, }}>
          Minimum Tenants
        </Typography>
      ),
    },
    { field: "max_pax", headerName: "Maximum Tenants", align: "center", headerAlign: "center", width: 150,
      renderHeader: (params: GridColumnHeaderParams) => (
        <Typography sx={{ color:theme.palette.primary.main, }}>
          Maximum Tenants
        </Typography>
      ),
    },
    { field: "num_rooms", headerName: "Number of Rooms", align: "center", headerAlign: "center", width: 150,
      valueFormatter: (params: GridValueFormatterParams<number>) => {
        if (params.value == null) {
          return '';
        } else if (params.value == 1){
          return `${params.value.toLocaleString('en')} room`;
        }else{
          return `${params.value.toLocaleString('en')} rooms`;
        }
      },
      renderHeader: (params: GridColumnHeaderParams) => (
        <Typography sx={{ color:theme.palette.primary.main, }}>
          Number of Rooms
        </Typography>
      ),
    },
    { field: "num_beds", headerName: "Number of Beds", align: "center", headerAlign: "center", width: 150,
      valueFormatter: (params: GridValueFormatterParams<number>) => {
        if (params.value == null) {
          return '';
        } else if (params.value == 1){
          return `${params.value.toLocaleString('en')} bed`;
        }else{
          return `${params.value.toLocaleString('en')} beds`;
        }
      },
      renderHeader: (params: GridColumnHeaderParams) => (
        <Typography sx={{ color:theme.palette.primary.main, }}>
          Number of Beds
        </Typography>
      ),
    },
    { field: "furnishing", headerName: "Furnishing Type", align: "center", headerAlign: "center", width: 150,
      renderHeader: (params: GridColumnHeaderParams) => (
        <Typography sx={{ color:theme.palette.primary.main, }}>
          Furnishing Type
        </Typography>
      ),
    },
  ];

  const gridRows = accommodations ? accommodations.map((accommodations) => {
    return{
      id: accommodations._id,
      name: accommodations.name,
      type: accommType[accommodations.type],
      price: accommodations.max_price,
      size_sqm: accommodations.size_sqm,
      maters_from_uplb: accommodations.meters_from_uplb,
      meters_from_uplb: accommodations.meters_from_uplb,
      min_pax: accommodations.min_pax,
      max_pax: accommodations.max_pax,
      num_rows: accommodations.num_rooms,
      num_rooms: accommodations.num_rooms,
      num_beds: accommodations.num_beds,
      furnishing: furnishing[accommodations.furnishing],
    }
  }) : []

  // events
  const handleDownload = () => {
    const id = downloadPdf(`#${tableId}`)
    if (me && onCreateReport) {
      onCreateReport({
        user_id: me._id,
        pdf_url: `http://localhost:5173/DownloadAccommodations-${id}.pdf`,
      })
        .then(() => {
          toggleDialog()
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
  }

  return (
    <React.Fragment>
      <Button
        disabled={!accommodations}
        variant="contained"
        onClick={matches? toggleDialog:handleDownload}
      >
        Download
      </Button>
      <TableContainer sx={{ display: 'none' }}>
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
            {accommodations? accommodations.map(accommodation => (
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
                      value={accommodation.max_price}
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
            )) : []}
          </TableBody>
        </Table>
      </TableContainer>

      {openDialog && accommodations && (
        <Box>
          <Dialog
            fullScreen
            open={matches? openDialog:false}
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
            <Box
              sx={{
                display: 'inline-flex',
                justifyContent: 'space-between',
                paddingRight: theme.spacing(2),
                paddingLeft: theme.spacing(1),
              }}
            >
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
              {/* Preview table */}
              <Box>
                <DataGrid 
                  rows={gridRows}
                  columns={columns}
                  slots={{
                    noRowsOverlay: () => (
                      <Stack height="100%" alignItems="center" justifyContent="center">
                        No rows in DataGrid
                      </Stack>
                    ),
                    toolbar: CustomToolbar,
                  }}
                  slotProps={{
                    toolbar: { background: 'red'},
                  }}
                  sx={{
                    textAlign: 'center',
                    '.MuiDataGrid-columnSeparator': {
                      display: 'none',
                    },
                    '&.MuiDataGrid-root': {
                      border: 'none',
                      maxHeight: '100%',
                      height: '100%',
                    },
                  }}
                />
              </Box>
            </DialogContent>
          </Dialog>
        </Box>
      )}
    </React.Fragment>
  )
}

function CustomToolbar() {
  const theme = useTheme()
  return (
    <GridToolbarContainer >
      <GridToolbarColumnsButton style={{backgroundColor: theme.palette.primary.main, paddingLeft: theme.spacing(1.5), paddingRight: theme.spacing(1.5)}} />
      <GridToolbarFilterButton style={{backgroundColor: theme.palette.primary.main, paddingLeft: theme.spacing(1.5), paddingRight: theme.spacing(1.5)}} />
      <GridToolbarDensitySelector style={{backgroundColor: theme.palette.primary.main, paddingLeft: theme.spacing(1.5), paddingRight: theme.spacing(1.5)}} />
      <GridToolbarExport style={{backgroundColor: theme.palette.primary.main, paddingLeft: theme.spacing(1.5), paddingRight: theme.spacing(1.5)}} printOptions={{ hideToolbar: true, hideFooter: true }} csvOptions={{ disableToolbarButton: true }}/>
    </GridToolbarContainer>
  );
}

export default DownloadAccommodations
