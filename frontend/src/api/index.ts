import axios from 'axios'

import { getToken } from '../services/localStorage'

export const API_URL = 'http://localhost:5000/api'

export async function apiGet<D>(resource: string, authToken?: string) {
  const res = await axios.get(`${API_URL}/${resource}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token') || authToken}`,
    },
  })

  return res.data as IResponse<D>
}

export async function apiPost<D, E>(
  resource: string,
  payload: IRequestPayload<D>,
  authToken?: string
) {
  const auth = `Bearer ${getToken() || authToken}`
  const res = await fetch(`${API_URL}/${resource}`, {
    method: 'POST',
    body: JSON.stringify(payload.payload),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: auth,
    },
  })

  const json = await res.json()

  return json as IResponse<E>
}

export async function apiPut<D, E>(
  resource: string,
  payload: IRequestPayload<D>
) {
  const res = await axios.put(
    `${API_URL}/${resource}`,
    { ...payload.payload },
    {
      headers: {
        Accept: 'application/json',
      },
    }
  )

  return res.data as IResponse<E>
}

export async function apiDelete<D>(resource: string) {
  const res = await axios.delete(`${API_URL}/${resource}`)

  return {
    success: res.data.success,
    data: res.data.data,
  } as IResponse<D>
}
