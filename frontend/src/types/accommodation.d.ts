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
  landmarks: string[]
  min_pax: number
  max_pax: number
  num_rooms: number
  num_beds: string // e.g. 2-3 beds
  num_views: number
  furnishing: TAccommodationFurnishing
  cooking_rules: string[]
  pet_rules: string[]
  other_rules: string[]
  safety_and_security: string[]
  appliances: string[]
  amenities: string[]
  created_at: string
  updated_at: string
  is_soft_deleted: boolean
}

interface IAccommodationState {
  accommodations: IAccommodation[] // why nullable? nullable during fetching/init
  dispatch: React.Dispatch<
    IReducerAction<TAccommodationActionType, TAccommodationPayload>
  >
}

// ACTIONS

type TAccommodationActionType =
  | 'AC_INIT'
  | 'AC_CREATE'
  | 'AC_RETRIEVE_ALL'
  | 'AC_RETRIEVE_BY_ID'
  | 'AC_UPDATE'
  | 'AC_DELETE'

type TAccommodationPayload = IAccommodation | IAccommodation[] | string
