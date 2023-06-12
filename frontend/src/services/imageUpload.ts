import { API_URL } from './api'
import { getToken } from './localStorage'

const imageUpload = async (file: File, token?: string) => {
  const formData = new FormData()
  formData.append('fileName', file)
  const res = await fetch(`${API_URL}/${ASSET_PATH}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token || getToken()}`,
    },
    body: formData,
  })

  const json = await res.json()
  return json as IResponse<string>
}

export default imageUpload

export const ASSET_PATH = 'asset'
