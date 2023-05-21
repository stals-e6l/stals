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
import { styled } from '@mui/material/styles';
import Empty from '../../assets/Images/Empty.png'
import theme from '../../theme';

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

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", align: "center", headerAlign: "center", flex: 1, hideable: false,
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
    { field: "type", headerName: "Type", align: "center", headerAlign: "center", flex: 1,
      renderHeader: (params: GridColumnHeaderParams) => (
        <Typography sx={{ color:theme.palette.primary.main, }}>
          Type
        </Typography>
      ),
    },
    { field: "price", headerName: "Price", align: "center", headerAlign: "center", flex: 1,
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
    { field: "size_sqm", headerName: "Room Size", align: "center", headerAlign: "center", flex: 1,
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
    { field: "meters_from_uplb", headerName: "Distance from UPLB", align: "center", headerAlign: "center", flex: 1,
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
    { field: "min_pax", headerName: "Minimum Tenants", align: "center", headerAlign: "center", flex: 1,
      renderHeader: (params: GridColumnHeaderParams) => (
        <Typography sx={{ color:theme.palette.primary.main, }}>
          Minimum Tenants
        </Typography>
      ),
    },
    { field: "max_pax", headerName: "Maximum Tenants", align: "center", headerAlign: "center", flex: 1,
      renderHeader: (params: GridColumnHeaderParams) => (
        <Typography sx={{ color:theme.palette.primary.main, }}>
          Maximum Tenants
        </Typography>
      ),
    },
    { field: "num_rooms", headerName: "Number of Rooms", align: "center", headerAlign: "center", flex: 1,
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
    { field: "num_beds", headerName: "Number of Beds", align: "center", headerAlign: "center", flex: 1,
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
    { field: "furnishing", headerName: "Furnishing Type", align: "center", headerAlign: "center", flex: 1,
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
      meters_from_uplb: accommodations.meters_from_uplb,
      min_pax: accommodations.min_pax,
      max_pax: accommodations.max_pax,
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
              <Box sx={{height: '100%', width: '100%'}}>
                <DataGrid 
                  rows={gridRows}
                  columns={columns}
                  slots={{
                    noRowsOverlay: CustomNoRowsOverlay,
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
                  initialState={{
                    columns: {
                      columnVisibilityModel: {
                        // Hide columns status and traderName, the other columns will remain visible
                        size_sqm: false,
                        meters_from_uplb: false,
                        min_pax: false,
                        max_pax:false,
                        num_rooms: false,
                        num_beds: false,
                        furnishing: false,
                      },
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

function CustomNoRowsOverlay() {

  const StyledGridOverlay = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    '& .ant-empty-img-1': {
      fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626',
    },
    '& .ant-empty-img-2': {
      fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
    },
    '& .ant-empty-img-3': {
      fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
    },
    '& .ant-empty-img-4': {
      fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
    },
    '& .ant-empty-img-5': {
      fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
      fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
    },
  }));

  return (
    <StyledGridOverlay>
      <svg
        width="120"
        height="100"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse
              className="ant-empty-img-5"
              cx="67.797"
              cy="106.89"
              rx="67.797"
              ry="12.668"
            />
            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      <Box sx={{ mt: 1, color: theme.palette.primary.main }}>No Rows</Box>
    </StyledGridOverlay>
  );
}

export default DownloadAccommodations
