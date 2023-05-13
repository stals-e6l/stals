import React from 'react'
import { apiGet } from '../../api'
import toMap from '../../utils/toMap'
import toArray from '../../utils/toArray'

interface IProps {
  children?: React.ReactNode
}

const ReviewsProvider: React.FC<IProps> = ({ children }) => {
  //state
  const [state, dispatch] = React.useReducer(reviewsReducer, {
    reviews: null,
    dispatch: null,
  })

  console.log({ reviewsState: state })

  return (
    <reviewsContext.Provider
      value={{
        reviews: state.reviews,
        dispatch,
      }}
    >
      {children}
    </reviewsContext.Provider>
  )
}

export default ReviewsProvider

const reviewsContext = React.createContext<IReviewsState>({
  reviews: null,
  dispatch: null,
})

export const useReviews = () => React.useContext<IReviewsState>(reviewsContext)

const reviewsReducer = (
  state: IReviewsState,
  action: IReducerAction<TReviewActionType, TReviewActionPayload>
): IReviewsState => {
  switch (action.type) {
    case 'SET_REVIEWS':
      return {
        ...state,
        reviews: toMap<IReview>(action.payload, '_id'),
      }
    default:
      return state
  }
}

// ACTIONS
export const fetchReviews = () => {
  const { dispatch } = useReviews()

  if (!dispatch) return

  return async (accommodationId: string) => {
    // TODO: use id to fetch the specific reviews
    const res = await apiGet<IReview[]>('mock/reviews')

    if (res.data && res.success) {
      dispatch({ type: 'SET_REVIEWS', payload: res.data })
    } else {
      if (res.messages) throw new Error(res.messages[0])
    }
  }
}

export const retrieveReviews = () => {
  const { reviews } = useReviews()
  if (!reviews) return null
  return toArray<IReview>(reviews)
}

export const createReview = () => {
  const { dispatch } = useReviews()
  if (!dispatch) return null
  return async (review: IReview) => {
    // TODO:
    // post
    // loads new reviews
  }
}

export const updateReview = () => {
  const { dispatch } = useReviews()
  if (!dispatch) return null
  return async (review: IReview) => {
    // TODO:
    // post
    // loads new reviews
  }
}

export const deleteReview = () => {
  const { dispatch } = useReviews()
  if (!dispatch) return null
  return async (reviewId: string) => {
    // TODO:
    // post
    // loads new reviews
  }
}
