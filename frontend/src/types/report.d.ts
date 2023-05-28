interface IReport {
  _id?: string
  user_id: string
  accommodation_id: string
  createdAt?: string
  updatedAt?: string
}

interface IReportsState {
  reports: IMap<IReport> | null
  dispatch: null | React.Dispatch<
    IReducerAction<TReportActionType, TReportActionPayload>
  >
}

type TReportActionType = 'SET_REPORTS' | 'ADD_REPORT'
type TReportActionPayload = IMap<IReport> | null | IReport
