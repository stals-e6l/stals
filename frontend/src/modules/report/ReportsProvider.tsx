import React from 'react'
import toArray from '../../utils/toArray'
import { apiPost } from '../../services/api'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import theme from '../../theme'

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

// ACTION

export const fetchReports = () => {
  // TODO: use this action in dashboard maybe (admin, owner)
  return async (userId: string) => {
    // TODO: call reports api
    // TODO: dispatch
  }
}

export const getReports = () => {
  const { reports } = useReports()
  if (!reports) return null
  return toArray<IReport>(reports)
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

export const createReport = () => {
  return async (report: IReport) => {
    const res = await apiPost<IReport, IReport>('report', {
      payload: report,
    })

    if (res.data && res.success) {
      // TODO:
    } else {
      if (res.messages) throw new Error(res.messages[0]) // TODO: error snackbar
    }
  }
}
