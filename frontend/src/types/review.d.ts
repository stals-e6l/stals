//
interface IReview {
  _id?: string
}

// STORE
type TReviewActionType = 'SET_REVIEWS'

type TReviewActionPayload = IReview[]

interface IReviewsState {
  reviews: IReview[] | null
  dispatch: React.Dispatch<
    IReducerAction<TReviewActionType, TReviewActionPayload>
  > | null
}
