import { useFormik } from 'formik'
import schema from './schema'

export const useAccommodationForm = (
  submitFn: (val: IAccommodation) => void,
  initVal?: IAccommodation
) => {
  const formik = useFormik({
    initialValues: {
      description: initVal?.description || '',
      // required
      _id: initVal?._id ,
      name: initVal?.name || '',
      address: initVal?.address || '',
      type: initVal?.type || 'hotel',
      price: initVal?.price || 0,
      size_sqm: initVal?.size_sqm || 0,
      meters_from_uplb: initVal?.meters_from_uplb || 0,
      min_pax: initVal?.min_pax || 0,
      max_pax: initVal?.max_pax || 0,
      num_rooms: initVal?.num_rooms || 0,
      num_beds: initVal?.num_beds || 0,
      num_views: initVal?.num_views || 0,
      furnishing: initVal?.furnishing || 'unfurnished',
      landmarks: initVal?.landmarks || [],
      cooking_rules: initVal?.cooking_rules || [],
      pet_rules: initVal?.pet_rules || [],
      other_rules: initVal?.other_rules || [],
      safety_and_security: initVal?.safety_and_security || [],
      appliances: initVal?.appliances || [],
      amenities: initVal?.amenities || [],
      is_soft_deleted: initVal?.is_soft_deleted || false,
    },
    validationSchema: schema,
    onSubmit: values => {
      submitFn(values)
    },
  })
  return formik
}
