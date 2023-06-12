import React from 'react'
import { apiDelete, apiGet, apiPost, apiPut } from '../../services/api'
import toMap from '../../utils/toMap'
import toArray from '../../utils/toArray'
import { showErrorSnackbar } from '../general/ErrorHandler'

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
  let reviews
  let review
  switch (action.type) {
    case 'SET_REVIEWS':
      return {
        ...state,
        reviews: toMap<IReview>(action.payload as IReview[], '_id'),
      }
    case 'DELETE_REVIEW':
      reviews = { ...state.reviews }
      delete reviews[action.payload as string]
      return {
        ...state,
        reviews: reviews,
      }
    case 'UPDATE_REVIEW':
      reviews = { ...state.reviews }
      review = action.payload as IReview
      reviews[review._id as string] = review
      return {
        ...state,
        reviews: reviews,
      }
    case 'ADD_REVIEW':
      reviews = { ...state.reviews }
      review = action.payload as IReview
      reviews[review._id as string] = review
      return {
        ...state,
        reviews: reviews,
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
    const res = await apiGet<IReview[]>(
      `review?accommodation_id=${accommodationId}`
    )

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
  const onShowError = showErrorSnackbar()
  if (!dispatch || !onShowError) return null
  return async (review: IReview) => {
    const res = await apiPost<IReview, IReview>('review', {
      payload: review,
    })

    if (res.success && res.data) {
      dispatch({ type: 'ADD_REVIEW', payload: res.data })
    } else if (!res.success && res.messages) {
      onShowError(res.messages[0])
    }
  }
}

export const updateReview = () => {
  const { dispatch } = useReviews()
  const onShowError = showErrorSnackbar()
  if (!dispatch || !onShowError) return null
  return async (review: IReview) => {
    const res = await apiPut<IReview, IReview>(`review/${review._id}`, {
      payload: review,
    })

    if (res.success && res.data) {
      dispatch({ type: 'UPDATE_REVIEW', payload: res.data })
    } else if (!res.success && res.messages) {
      onShowError(res.messages[0])
    }
  }
}

export const deleteReview = () => {
  const { dispatch } = useReviews()
  const onShowError = showErrorSnackbar()
  if (!dispatch || !onShowError) return null
  return async (reviewId: string) => {
    const res = await apiDelete<string>(`review/${reviewId}`)

    if (res.success) {
      dispatch({ type: 'DELETE_REVIEW', payload: reviewId })
    } else if (!res.success && res.messages) {
      onShowError(res.messages[0])
    }
  }
}

export const averageReviewRating = () => {
  const { reviews } = useReviews()
  if (!reviews) return null
  const arrReviews = toArray<IReview>(reviews)
  if (!arrReviews) return null
  let total = 0
  arrReviews.forEach(el => (total = total + el.rating))
  return total / arrReviews.length
}
