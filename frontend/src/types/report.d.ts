interface IReport {
  _id?: string
  user_id: string
  pdf_url: string
  createdAt?: string
  updatedAt?: string
}

interface IReportsState {
  reports: IMap<IReport> | null
  dispatch: null | React.Dispatch<
    IReducerAction<TReportActionType, TReportActionPayload>
  >
}

type TReportActionType = 'SET_REPORTS'
type TReportActionPayload = IMap<IReport> | null
