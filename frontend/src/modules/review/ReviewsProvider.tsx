import React from 'react'

interface IProps {
  children?: React.ReactNode
}

const ReviewsProvider: React.FC<IProps> = ({ children }) => {
  //state
  const [state, dispatch] = React.useReducer(reviewsReducer, {
    reviews: null,
    dispatch: null,
  })

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

const reviewsReducer = (
  state: IReviewsState,
  action: IReducerAction<TReviewActionType, TReviewActionPayload>
): IReviewsState => {
  switch (action.type) {
    case 'SET_REVIEWS':
      return {
        ...state,
        reviews: action.payload as IReview[],
      }
    default:
      return state
  }
}
