import React from 'react'
import { mockAccommodations } from './mock'

interface IProps {
  children?: React.ReactNode
}

const AccommodationProvider: React.FC<IProps> = ({ children }) => {
  const [state, dispatch] = React.useReducer(accommodationReducer, {})

  // init accommodations
  React.useEffect(() => {
    dispatch({
      type: 'AC_INIT',
      payload: mockAccommodations,
    })
  }, [])

  // selectors
  const retrieveAllAccommodations = () => state.accommodations || null
  const retrieveAccommodationById = (id: string) => {
    const res = state.accommodations?.filter(el => el._id === id)
    if (!res || res.length === 0) return null
    return res[0]
  }

  return (
    <accommodationContext.Provider
      value={{
        accommodations: state.accommodations,
        dispatch,
        retrieveAllAccommodations,
        retrieveAccommodationById,
      }}
    >
      {children}
    </accommodationContext.Provider>
  )
}

export default AccommodationProvider

const accommodationContext = React.createContext<IAccommodationState>({})

export const useAccommodation = () =>
  React.useContext<IAccommodationState>(accommodationContext)

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
    default:
      return state
  }
}
