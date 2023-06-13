//
interface IReview {
  _id?: string
  user_id: string | IUser
  accommodation_id: string
  rating: number
  comment?: string // not requirede
  createdAt?: string
  updatedAt?: string
}

// STORE
type TReviewActionType =
  | 'SET_REVIEWS'
  | 'DELETE_REVIEW'
  | 'UPDATE_REVIEW'
  | 'ADD_REVIEW'

type TReviewActionPayload = IReview[] | string | IReview

interface IReviewsState {
  reviews: IMap<IReview> | null
  dispatch: React.Dispatch<
    IReducerAction<TReviewActionType, TReviewActionPayload>
  > | null
}
