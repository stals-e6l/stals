import axios from 'axios'

export const API_URL = 'http://localhost:5000/api'

export async function apiGet<D>(resource: string) {
  const res = await axios.get(`${API_URL}/${resource}`)

  return {
    success: res.data.success,
    data: res.data.data,
  } as IResponse<D>
}
