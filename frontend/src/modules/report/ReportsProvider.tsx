import React from 'react'

interface IProps {
  children?: React.ReactNode
}

const ReportsProvider: React.FC<IProps> = ({ children }) => {
  //state
  const [state, dispatch] = React.useReducer(reportsReducer, {
    reports: null,
    dispatch: null,
  })
  return (
    <reportsContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </reportsContext.Provider>
  )
}

export default ReportsProvider

const reportsContext = React.createContext<IReportsState>({
  reports: null,
  dispatch: null,
})

export const useReports = () => React.useContext<IReportsState>(reportsContext)

const reportsReducer = (
  state: IReportsState,
  action: IReducerAction<TReportActionType, TReportActionPayload>
): IReportsState => {
  switch (action.type) {
    case 'SET_REPORTS':
      return {
        ...state,
        reports: action.payload as IMap<IReport>,
      }

    default:
      return state
  }
}
