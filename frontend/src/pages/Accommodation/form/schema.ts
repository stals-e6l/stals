import * as Yup from 'yup'

const schema = Yup.object<IAccommodation>({
  description: Yup.string(),
  // required
  _id: Yup.string().required(),
  name: Yup.string().required(),
  address: Yup.string().required(),
  type: Yup.string().required(),
  price: Yup.number().required(),
  size_sqm: Yup.number().required(),
  meters_from_uplb: Yup.number().required(),
  min_pax: Yup.number().required(),
  max_pax: Yup.number().required(),
  num_rooms: Yup.number().required(),
  num_beds: Yup.number().required(),
  num_views: Yup.number().required(),
  furnishing: Yup.string().required(),
  landmarks: Yup.array().required(),
  cooking_rules: Yup.array().required(),
  pet_rules: Yup.array().required(),
  other_rules: Yup.array().required(),
  safety_and_security: Yup.array().required(),
  appliances: Yup.array().required(),
  amenities: Yup.array().required(),
  is_soft_deleted: Yup.boolean().required(),
})

export default schema
