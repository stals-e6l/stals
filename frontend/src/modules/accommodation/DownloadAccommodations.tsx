/* eslint-disable indent */
import React from 'react'
import useDialog from '../../hooks/useDialog'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Button,
  Box,
  Typography,
  IconButton,
  Fab,
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
  useGridApiRef,
  GridPrintExportOptions,
} from '@mui/x-data-grid'
import { alpha, useTheme } from '@mui/material/styles'
import CloseIcon from '@mui/icons-material/Close'
import { downloadPdf, createReport } from '../report/ReportsProvider'
import { retrieveAccommodations } from './AccommodationsProvider'
import { getMe } from '../auth/AuthProvider'
import PrintIcon from '@mui/icons-material/Print'
import toSentenceCase from '../../utils/toSentenceCase'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled } from '@mui/material/styles'
import theme, { COLOR } from '../../theme'

interface IProps {
  children?: React.ReactNode
}

const DownloadAccommodations: React.FC<IProps> = () => {
  // hooks
  const theme = useTheme()
  const { open: openDialog, toggleDialog } = useDialog()
  const accommodations = retrieveAccommodations()
  const onCreateReport = createReport()
  const me = getMe()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

  // immediates
  const tableId = 'accommodations-table'

  const accommType: IMap<string> = {
    hotel: 'Hotel',
    apartment: 'Apartment',
    bedspace: 'Bedspace',
    dormitory: 'Dormitory',
    transient: 'Transient',
  }
  const furnishing: IMap<string> = {
    unfurnished: 'Unfurnished',
    semifurnished: 'Semi-furnished',
    fully_furnished: 'Fully Furnished',
  }

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      align: 'center',
      headerAlign: 'center',
      flex: 1,
      hideable: false,
      valueFormatter: (params: GridValueFormatterParams<string>) => {
        if (params.value == null) {
          return ''
        }
        return toSentenceCase(params.value)
      },
      renderHeader: () => (
        <Typography sx={{ color: theme.palette.primary.main }}>Name</Typography>
      ),
    },
    {
      field: 'type',
      headerName: 'Type',
      align: 'center',
      headerAlign: 'center',
      flex: 1,
      renderHeader: () => (
        <Typography sx={{ color: theme.palette.primary.main }}>Type</Typography>
      ),
    },
    {
      field: 'price',
      headerName: 'Price',
      align: 'center',
      headerAlign: 'center',
      flex: 1,
      valueFormatter: (params: GridValueFormatterParams<number>) => {
        if (params.value == null) {
          return ''
        }
        return `₱ ${params.value.toLocaleString('en')}`
      },
      renderHeader: () => (
        <Typography sx={{ color: theme.palette.primary.main }}>
          Price
        </Typography>
      ),
    },
    {
      field: 'size_sqm',
      headerName: 'Room Size',
      align: 'center',
      headerAlign: 'center',
      flex: 1,
      valueFormatter: (params: GridValueFormatterParams<number>) => {
        if (params.value == null) {
          return ''
        }
        return `${params.value.toLocaleString('en')} sqm.`
      },
      renderHeader: () => (
        <Typography sx={{ color: theme.palette.primary.main }}>
          Room Size
        </Typography>
      ),
    },
    {
      field: 'meters_from_uplb',
      headerName: 'Distance from UPLB',
      align: 'center',
      headerAlign: 'center',
      flex: 1,
      valueFormatter: (params: GridValueFormatterParams<number>) => {
        if (params.value == null) {
          return ''
        }
        return `${params.value.toLocaleString('en')} meters`
      },
      renderHeader: () => (
        <Typography sx={{ color: theme.palette.primary.main }}>
          Distance from UPLB
        </Typography>
      ),
    },
    {
      field: 'min_pax',
      headerName: 'Minimum Tenants',
      align: 'center',
      headerAlign: 'center',
      flex: 1,
      valueFormatter: (params: GridValueFormatterParams<number>) => {
        if (params.value == null) {
          return ''
        } else if (params.value == 1) {
          return `${params.value.toLocaleString('en')} tenant`
        } else {
          return `${params.value.toLocaleString('en')} tenants`
        }
      },
      renderHeader: () => (
        <Typography sx={{ color: theme.palette.primary.main }}>
          Minimum Tenants
        </Typography>
      ),
    },
    {
      field: 'max_pax',
      headerName: 'Maximum Tenants',
      align: 'center',
      headerAlign: 'center',
      flex: 1,
      valueFormatter: (params: GridValueFormatterParams<number>) => {
        if (params.value == null) {
          return ''
        } else if (params.value == 1) {
          return `${params.value.toLocaleString('en')} tenant`
        } else {
          return `${params.value.toLocaleString('en')} tenants`
        }
      },
      renderHeader: () => (
        <Typography sx={{ color: theme.palette.primary.main }}>
          Maximum Tenants
        </Typography>
      ),
    },
    {
      field: 'num_rooms',
      headerName: 'Number of Rooms',
      align: 'center',
      headerAlign: 'center',
      flex: 1,
      valueFormatter: (params: GridValueFormatterParams<number>) => {
        if (params.value == null) {
          return ''
        } else if (params.value == 1) {
          return `${params.value.toLocaleString('en')} room`
        } else {
          return `${params.value.toLocaleString('en')} rooms`
        }
      },
      renderHeader: () => (
        <Typography sx={{ color: theme.palette.primary.main }}>
          Number of Rooms
        </Typography>
      ),
    },
    {
      field: 'num_beds',
      headerName: 'Number of Beds',
      align: 'center',
      headerAlign: 'center',
      flex: 1,
      valueFormatter: (params: GridValueFormatterParams<number>) => {
        if (params.value == null) {
          return ''
        } else if (params.value == 1) {
          return `${params.value.toLocaleString('en')} bed`
        } else {
          return `${params.value.toLocaleString('en')} beds`
        }
      },
      renderHeader: () => (
        <Typography sx={{ color: theme.palette.primary.main }}>
          Number of Beds
        </Typography>
      ),
    },
    {
      field: 'furnishing',
      headerName: 'Furnishing Type',
      align: 'center',
      headerAlign: 'center',
      flex: 1,
      renderHeader: () => (
        <Typography sx={{ color: theme.palette.primary.main }}>
          Furnishing Type
        </Typography>
      ),
    },
  ]

  const gridRows = !accommodations
    ? []
    : accommodations.map(accommodations => ({
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
      }))

  return (
    <React.Fragment>
      <Fab
        disabled={!accommodations}
        onClick={toggleDialog}
        sx={{
          bottom: '4%',
          right: '2.5%',
          [theme.breakpoints.down('sm')]: {
            bottom: '2.5%',
            right: '1%',
          },
          [theme.breakpoints.down('md')]: {
            display: 'none',
          },
        }}
      >
        <PrintIcon sx={{ color: 'inherit' }} />
      </Fab>

      {openDialog && accommodations && (
        <Box>
          <Dialog
            fullScreen
            open={matches ? openDialog : false}
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
                paddingRight: theme.spacing(1),
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
              <IconButton
                onClick={toggleDialog}
                sx={{
                  width: theme.spacing(5),
                  height: theme.spacing(5),
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: theme.spacing(1.5),
                  marginRight: theme.spacing(1.5),
                }}
              >
                <CloseIcon
                  sx={{
                    color: theme.palette.primary.main,
                  }}
                />
              </IconButton>
            </Box>

            <Divider />

            <DialogContent>
              {/* Preview table */}
              <Box component="div" sx={{ height: '100%', width: '100%' }}>
                <div id="pdf">
                  <DataGrid
                    rows={gridRows}
                    columns={columns}
                    slots={{
                      noRowsOverlay: CustomNoRowsOverlay,
                      toolbar: CustomToolbar,
                    }}
                    slotProps={{
                      columnsPanel: {
                        disableHideAllButton: true,
                        disableShowAllButton: true,
                      },
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
                      '@media print': {
                        '@page': {
                          size: 'A4 landscape',
                        },
                      },
                    }}
                    initialState={{
                      columns: {
                        columnVisibilityModel: {
                          // Hide columns status and traderName, the other columns will remain visible
                          size_sqm: false,
                          meters_from_uplb: false,
                          min_pax: false,
                          max_pax: false,
                          num_rooms: false,
                          num_beds: false,
                          furnishing: false,
                        },
                      },
                    }}
                  />
                </div>
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

  const toolbarButtonSx = {
    root: {
      backgroundColor: theme.palette.primary.main,
      paddingLeft: theme.spacing(1.5),
      paddingRight: theme.spacing(1.5),
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.main,
        top: '-1px',
        boxShadow: `${alpha(COLOR.black, 0.3)} 0 1px 6px 2px`,
      },
    },
  }
  const apiRef = useGridApiRef()

  // const printDataGrid = () => apiRef.current.exportDataAsPrint();
  // const printDataGrid = ({ apiRef }: GridPrintExportOptions) =>
  // gridFilteredSortedRowIdsSelector(apiRef);
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton sx={toolbarButtonSx.root} />
      <GridToolbarFilterButton sx={toolbarButtonSx.root} />
      <GridToolbarDensitySelector sx={toolbarButtonSx.root} />
      <GridToolbarExport
        sx={toolbarButtonSx.root}
        exportDataAsPrint={{
          hideToolbar: true,
          hideFooter: true,
          allColumns: true,
        }}
        csvOptions={{ disableToolbarButton: true }}
      />
      {/* <Button
        variant="contained"
        onClick={() => {
          apiRef.current
          downloadPdf('pdf')
        }}
      >
        Print
      </Button> */}
    </GridToolbarContainer>
  )
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
  }))

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
  )
}

export default DownloadAccommodations
