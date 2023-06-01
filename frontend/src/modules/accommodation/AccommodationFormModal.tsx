/* eslint-disable indent */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import React from 'react'
import AccommodationForm from './AccommodationForm'
import useDialog from '../../hooks/useDialog'
import {
  createAccommodation,
  editAccommodation,
} from './AccommodationsProvider'
import { COLOR } from '../../theme'
import AddIcon from '@mui/icons-material/Add'
import { ALLOWABLE_FEATURES, getMe } from '../auth/AuthProvider'
import imageUpload from '../../services/imageUpload'

interface IProps {
  children?: React.ReactNode
  defaultValues?: IAccommodation
  onClose?: () => void
}

const AccommodationFormModal: React.FC<IProps> = ({
  defaultValues,
  onClose,
}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const me = getMe()

  // hooks
  const { open, toggleDialog } = useDialog()
  const onCreateAccommodation = createAccommodation()
  const onEditAccommodation = editAccommodation()

  // state
  const [form, setForm] = React.useState<IAccommodation>({
    image: {
      url: (defaultValues && defaultValues.image.url) || '',
    },
    name: (defaultValues && defaultValues.name) || '',
    address: (defaultValues && defaultValues.address) || '',
    type: (defaultValues && defaultValues.type) || 'hotel',
    min_price: (defaultValues && defaultValues.min_price) || 0,
    max_price: (defaultValues && defaultValues.max_price) || 0,
    size_sqm: (defaultValues && defaultValues.size_sqm) || 0,
    meters_from_uplb: (defaultValues && defaultValues.meters_from_uplb) || 0,
    min_pax: (defaultValues && defaultValues.min_pax) || 0,
    max_pax: (defaultValues && defaultValues.max_pax) || 0,
    num_rooms: (defaultValues && defaultValues.num_rooms) || 0,
    num_beds: (defaultValues && defaultValues.num_beds) || 0,
    num_views: (defaultValues && defaultValues.num_views) || 1,
    furnishing:
      (defaultValues && defaultValues.furnishing) || 'fully_furnished',
    landmarks: (defaultValues && defaultValues.landmarks) || [],
    cooking_rules: (defaultValues && defaultValues.cooking_rules) || [],
    pet_rules: (defaultValues && defaultValues.pet_rules) || [],
    other_rules: (defaultValues && defaultValues.other_rules) || [],
    safety_and_security:
      (defaultValues && defaultValues.safety_and_security) || [],
    appliances: (defaultValues && defaultValues.appliances) || [],
    amenities: (defaultValues && defaultValues.amenities) || [],
    is_soft_deleted: (defaultValues && defaultValues.is_soft_deleted) || false,
  })
  const [file, setFile] = React.useState<File>()
  const [error, setError] = React.useState<string | null>(null);

  // events
  const setFieldValue = (
    key: keyof IAccommodation,
    val: string | number | string[]
  ) => {
    setForm(prev => ({ ...prev, [key]: val }))
  }

  // events
  const handleSubmit = async () => {
    if (onCreateAccommodation && !defaultValues && file) {
      const res = await imageUpload(file)
      let formData = { ...form }
      if (res.success) {
        formData = { ...form, image: { url: res.data as string } }
      }
      //const response = await onCreateAccommodation(formData)
      onCreateAccommodation(formData).catch(err => {
        console.log(String(err).split(','))
        //setError('Invalid input')
      })
    } else if (onEditAccommodation && defaultValues) {
      onEditAccommodation({ ...form, _id: defaultValues._id as string }).then(
        toggleDialog
      )
    }
    if (onClose) onClose()
  }

  React.useEffect(() => {
    if (me) {
      setForm(prev => ({ ...prev, user_id: me._id }))
    }
  }, [me])

  const cancelBtnSx = {
    root: {
      backgroundColor: COLOR.negativeRed,
      color: COLOR.white,
      borderRadius: '4px',
      padding: '10px 20px',
      '&:hover': {
        backgroundColor: '#cc1d33',
      },
    },
  }

  const submitBtnSx = {
    root: {
      backgroundColor: COLOR.green,
      color: COLOR.darkGreen,
      borderRadius: theme.spacing(0.5),
      padding: '10px 20px',
      marginRight: '20px',
      '&:hover': {
        backgroundColor: '#93dba4',
      },
    },
  }
  return (
    <React.Fragment>
      {me &&
        ALLOWABLE_FEATURES.create.accommodation.includes(me.role) &&
        !defaultValues && (
          <Fab
            onClick={toggleDialog}
            sx={{
              ...submitBtnSx.root,
              borderRadius: '50%',
              position: 'absolute',
              bottom: '5%',
              right: '5%',
              background: theme.palette.primary.main,
              color: theme.palette.common.white,
            }}
          >
            <AddIcon />
          </Fab>
        )}
      {me &&
        ALLOWABLE_FEATURES.create.accommodation.includes(me.role) &&
        defaultValues && (
          <Button
            onClick={toggleDialog}
            variant="contained"
            sx={{
              background: theme.palette.primary.main,
              color: theme.palette.common.white,
              fontWeight: 'bold',
            }}
          >
            Edit
          </Button>
        )}

      {open && (
        <Dialog fullScreen={isMobile} open={open} onClose={toggleDialog}>
          <DialogTitle sx={{ color: COLOR.blue }}>
            {' '}
            {/*TEMP COLOR*/}
            {defaultValues ? 'Update accommodation' : 'Create accommodation'}
          </DialogTitle>

          <DialogContent sx={{}}>
            {' '}
            {/*TEMP COLOR*/}
            <AccommodationForm
              form={form}
              setFieldValue={setFieldValue}
              setFile={setFile}
              error={error}
            />
          </DialogContent>

          <DialogActions sx={{}}>
            {' '}
            {/*TEMP COLOR*/}
            <Button onClick={toggleDialog} sx={cancelBtnSx.root}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} sx={submitBtnSx.root}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </React.Fragment>
  )
}

export default AccommodationFormModal
