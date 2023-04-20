interface IResponse<D> {
  success: boolean
  data?: D
  messages?: string[]
}

interface IRequestPayload<D> {
  payload: D
}
