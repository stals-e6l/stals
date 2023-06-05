type TAccommodationType =
  | 'hotel'
  | 'apartment'
  | 'bedspace'
  | 'dormitory'
  | 'transient'
type TAccommodationFurnishing =
  | 'unfurnished'
  | 'semifurnished'
  | 'fully_furnished'

interface IAccommodation {
  // nullable
  _id?: string // why? this is only available when created
  user_id?: string // why? same with _id
  description?: string // an accommodation can have no description
  // required
  name: string
  image: {
    url: string
  }
  address: string
  type: TAccommodationType
  furnishing: TAccommodationFurnishing
  min_price: number
  max_price: number
  size_sqm: number
  meters_from_uplb: number
  min_pax: number
  max_pax: number
  num_rooms: number
  num_beds: number //string // e.g. 2-3 beds
  num_views: number
  landmarks: string[]
  cooking_rules: string[]
  pet_rules: string[]
  other_rules: string[]
  safety_and_security: string[]
  appliances: string[]
  amenities: string[]
  createdAt?: string
  updatedAt?: string
  is_soft_deleted: boolean
}

interface IArchiveAccomodationPayload {
  _id: string
  is_soft_deleted: boolean
}

interface IAccommodationsFilter {
  search?: string
  name?: string
  type?: TAccommodationType | ''
  min_price?: number
  max_price?: number
  size_sqm?: number
  meters_from_uplb?: number
  min_pax?: number
  max_pax?: number
  num_rooms?: number
  num_beds?: number //string // e.g. 2-3 beds
  furnishing?: TAccommodationFurnishing | ''
}

interface IDownloadAccommodations {
  name: boolean
  type: boolean
  price: boolean
  size_sqm: boolean
  meters_from_uplb: boolean
  min_pax: boolean
  max_pax: boolean
  num_rooms: boolean
  num_beds: boolean
  furnishing: boolean
}

type IDownloadAccommodationsField = keyof IDownloadAccommodations

interface IAccommodationsState {
  accommodations: IMap<IAccommodation> | null
  dispatch: React.Dispatch<
    IReducerAction<TAccommodationActionType, TAccommodationPayload>
  > | null
}

type TAccommodationActionType =
  | 'SET_ACCOMMODATIONS'
  | 'ADD_ACCOMMODATION'
  | 'DELETE_ACCOMMODATION'
  | 'EDIT_ACCOMMODATION'
  | 'APPEND_ACCOMMODATIONS'

type TAccommodationPayload = IAccommodation[] | IAccommodation | string
