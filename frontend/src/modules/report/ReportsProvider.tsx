import React from 'react'
import toArray from '../../utils/toArray'
import { apiGet, apiPost } from '../../services/api'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import theme from '../../theme'
import toMap from '../../utils/toMap'
import { showErrorSnackbar } from '../general/ErrorHandler'

interface IProps {
  children?: React.ReactNode
}

const ReportsProvider: React.FC<IProps> = ({ children }) => {
  //state
  const [state, dispatch] = React.useReducer(reportsReducer, {
    reports: null,
    dispatch: null,
  })

  console.log({ reportsState: state })
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
  let temp: any = undefined
  let payload: any = undefined
  switch (action.type) {
    case 'SET_REPORTS':
      return {
        ...state,
        reports: action.payload as IMap<IReport>,
      }
    case 'ADD_REPORT':
      payload = action.payload as IReport
      temp = { ...state.reports }
      temp[payload.user_id] = payload

      return {
        ...state,
        reports: temp,
      }
    default:
      return state
  }
}

// ACTION

export const fetchReports = () => {
  const { dispatch } = useReports()
  const onShowError = showErrorSnackbar()
  if (!dispatch || !onShowError) return
  return async (accommodationId: string) => {
    const res = await apiGet<IReport[]>(
      `report?accommodation_id=${accommodationId}`
    )
    if (res.success && res.data) {
      const reports = toMap<IReport>(res.data, 'user_id')
      dispatch({ type: 'SET_REPORTS', payload: reports })
    } else {
      if (res.messages) onShowError(res.messages[0])
    }
  }
}

export const getReports = () => {
  const { reports } = useReports()
  if (!reports) return null
  // return toArray<IReport>(reports)
  return reports
}

export const createReport = () => {
  const { dispatch } = useReports()
  const onShowError = showErrorSnackbar()
  if (!dispatch || !onShowError) return
  return async (report: IReport) => {
    const res = await apiPost<IReport, IReport>('report', {
      payload: report,
    })
    if (res.success && res.data) {
      dispatch({ type: 'ADD_REPORT', payload: res.data })
    } else {
      if (res.messages) onShowError(res.messages[0])
    }
  }
}

export const downloadPdf = (htmlRef: string) => {
  const doc = new jsPDF('l')
  doc.text('Accommodation Details', doc.internal.pageSize.getWidth() / 2, 10, {
    align: 'center',
  })
  autoTable(doc, {
    headStyles: { textColor: theme.palette.primary.main },
    useCss: true,
    html: htmlRef,
  })
  const res = doc.save('AccommodationDetails.pdf')
  return res.getFileId()
}
