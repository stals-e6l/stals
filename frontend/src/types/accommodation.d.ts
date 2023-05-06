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
  owner_id?: string // why? same with _id
  description?: string // an accommodation can have no description
  // required
  name: string
  address: string
  type: TAccommodationType
  price: number
  size_sqm: number
  meters_from_uplb: number
  min_pax: number
  max_pax: number
  num_rooms: number
  num_beds: number //string // e.g. 2-3 beds
  num_views: number
  furnishing: TAccommodationFurnishing
  landmarks: string[]
  cooking_rules: string[]
  pet_rules: string[]
  other_rules: string[]
  safety_and_security: string[]
  appliances: string[]
  amenities: string[]
  created_at?: string
  updated_at?: string
  is_soft_deleted: boolean
}

interface IAccommodationFilter {
  name?: string
  type?: TAccommodationType
  price?: number
  size_sqm?: number
  meters_from_uplb?: number
  min_pax?: number
  max_pax?: number
  num_rooms?: number
  num_beds?: number //string // e.g. 2-3 beds
  furnishing?: TAccommodationFurnishing
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
  accommodations: IAccommodation[] | null
  dispatch: React.Dispatch<
    IReducerAction<TAccommodationActionType, TAccommodationPayload>
  > | null
}

type TAccommodationActionType = 'INIT_ACCOMMODATIONS'

type TAccommodationPayload = IAccommodation[]
