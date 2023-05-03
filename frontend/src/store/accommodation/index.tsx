import React from 'react'
import { apiGet } from '../../api'

interface IProps {
  children?: React.ReactNode
}

const AccommodationProvider: React.FC<IProps> = ({ children }) => {
  const [state, dispatch] = React.useReducer(accommodationReducer, {
    accommodations: [],
    results: [],
    dispatch: () => undefined,
  })

  // init accommodations
  const initAccommodations = async () => {
    const res = await apiGet<IAccommodation[]>('accommodation')
    if (res.success && res.data) {
      console.log({ loaded: true })
      dispatch({
        type: 'AC_INIT',
        payload: res.data,
      })
    }
  }
  React.useEffect(() => {
    initAccommodations()
  }, [])

  return (
    <accommodationContext.Provider
      value={{
        results: state.results,
        accommodations: state.accommodations,
        dispatch,
      }}
    >
      {children}
    </accommodationContext.Provider>
  )
}

export default AccommodationProvider

export const accommodationContext = React.createContext<IAccommodationState>({
  accommodations: [],
  results: [],
  dispatch: () => undefined,
})

const accommodationReducer = (
  state: IAccommodationState,
  action: IReducerAction<TAccommodationActionType, TAccommodationPayload>
): IAccommodationState => {
  switch (action.type) {
    case 'AC_INIT':
      return {
        ...state,
        accommodations: action.payload as IAccommodation[],
      }
    case 'AC_CREATE':
      return {
        ...state,
        accommodations: [
          ...(state.accommodations || []),
          action.payload as IAccommodation,
        ],
      }

    case 'AC_UPDATE':
      return {
        ...state,
        accommodations: [
          ...(state.accommodations || []).filter(
            el => el._id !== (action.payload as IAccommodation)._id
          ),
          action.payload as IAccommodation,
        ],
      }
    case 'AC_DELETE':
      return {
        ...state,
        accommodations: (state.accommodations || []).filter(
          el => el._id !== (action.payload as string)
        ),
      }
    case 'AC_SEARCH': {
      return {
        ...state,
        results: action.payload as IAccommodation[],
      }
    }
    default:
      return state
  }
}
