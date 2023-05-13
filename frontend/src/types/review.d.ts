//
interface IReview {
  _id?: string
  user_id: string
  accommodation_id: string
  rating: number
  comment?: string // not requirede
  createdAt?: string
  updatedAt?: string
}

// STORE
type TReviewActionType = 'SET_REVIEWS'

type TReviewActionPayload = IReview[]

interface IReviewsState {
  reviews: IMap<IReview> | null
  dispatch: React.Dispatch<
    IReducerAction<TReviewActionType, TReviewActionPayload>
  > | null
}
