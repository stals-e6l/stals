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
import { 
  DataGrid, 
  GridColDef, 
  GridValueGetterParams, 
  GridValueFormatterParams, 
  GridToolbar,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close';
import toSentenceCase from '../../helpers/toSentenceCase';
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

  const CustomNowRowsOverlay = () => (
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
    },
    { field: "type", headerName: "Type", align: "center", headerAlign: "center", width: 150 },
    { field: "price", headerName: "Price", align: "center", headerAlign: "center", width: 150,
      valueFormatter: (params: GridValueFormatterParams<number>) => {
        if (params.value == null) {
          return '';
        }
        return `₱ ${params.value.toLocaleString('en')}`;
      },
    },
    { field: "size_sqm", headerName: "Room Size", align: "center", headerAlign: "center", width: 150,
      valueFormatter: (params: GridValueFormatterParams<number>) => {
        if (params.value == null) {
          return '';
        }
        return `${params.value.toLocaleString('en')} sqm.`;
      },
    },
    { field: "meters_from_uplb", headerName: "Distance from UPLB", align: "center", headerAlign: "center", width: 150,
      valueFormatter: (params: GridValueFormatterParams<number>) => {
        if (params.value == null) {
          return '';
        }
        return `${params.value.toLocaleString('en')} meters`;
      },
    },
    { field: "min_pax", headerName: "Minimum Tenants", align: "center", headerAlign: "center", width: 150 },
    { field: "max_pax", headerName: "Minimum Tenants", align: "center", headerAlign: "center", width: 150 },
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
    },
    { field: "furnishing", headerName: "Furnishing Type", align: "center", headerAlign: "center", width: 150 },
  ];

  console.log(accommodations);

  const gridRows = accommodations ? accommodations.map((accommodations) => {
    return{
      id: accommodations._id,
      name: accommodations.name,
      type: accommType[accommodations.type],
      price: accommodations.price,
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
              {/* Preview table */}
              <DataGrid 
                rows={gridRows}
                columns={columns}
                slots={{
                  noRowsOverlay: CustomNowRowsOverlay,
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
                  },
                }}
              />
            </DialogContent>

            {/* <DialogActions
              sx={{
                paddingRight: theme.spacing(4.5),
                paddingBottom: theme.spacing(1.5),
              }}
            >
              <Button variant="contained" onClick={handleDownload}>
                Save PDF
              </Button>
              <Button variant="outlined" onClick={toggleDialog}>
                Cancel
              </Button>
            </DialogActions> */}
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
      <GridToolbarColumnsButton style={{backgroundColor: theme.palette.primary.main}} />
      <GridToolbarFilterButton style={{backgroundColor: theme.palette.primary.main}} />
      <GridToolbarDensitySelector style={{backgroundColor: theme.palette.primary.main}} />
      <GridToolbarExport style={{backgroundColor: theme.palette.primary.main}} />
    </GridToolbarContainer>
  );
}

export default DownloadAccommodations
