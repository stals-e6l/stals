import { getToken } from './localStorage'

export const API_URL = import.meta.env.PROD
  ? 'https://api.airvnv.info/api'
  : 'http://localhost:3001/api'

export async function apiGet<D>(resource: string, authToken?: string) {
  const res = await fetch(`${API_URL}/${resource}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token') || authToken}`,
      Accept: 'application/json',
    },
  })

  const json = await res.json()

  return json as IResponse<D>
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
  payload: IRequestPayload<D>,
  authToken?: string
) {
  const auth = `Bearer ${getToken() || authToken}`
  const res = await fetch(`${API_URL}/${resource}`, {
    method: 'PUT',
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

export async function apiDelete<D>(resource: string, authToken?: string) {
  const auth = `Bearer ${getToken() || authToken}`
  const res = await fetch(`${API_URL}/${resource}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: auth,
    },
  })

  const json = await res.json()

  return json as IResponse<D>
}
