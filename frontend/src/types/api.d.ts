interface IResponse<D> {
  success: boolean
  data: D
}

interface IRequestPayload<D> {
  payload: D
}
