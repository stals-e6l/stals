import axios from 'axios'

export async function apiGet<D>(url: string) {
  const res = await axios.get(url)

  return {
    success: res.data.success,
    data: res.data.data,
  } as IResponse<D>
}
