// import axios from 'axios'

export const API_URL = 'http://localhost:5000/api'

export async function apiGet<D>(resource: string, authToken?: string) {
  // const res = await axios.get(`${API_URL}/${resource}`, {
  //   headers: {
  //     Authorization: `Bearer ${localStorage.getItem('token') || authToken}`,
  //   },
  // })

  const res = await fetch(`${API_URL}/${resource}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token') || authToken}`,
    },
  })

  const json = await res.json()

  return json as IResponse<D>
}

export async function apiPost<D, E>(
  resource: string,
  payload: IRequestPayload<D>
) {
  // const res = await axios.post(
  //   `${API_URL}/${resource}`,
  //   { ...payload.payload },
  //   {
  //     headers: {
  //       Accept: 'application/json',
  //     },
  //   }
  // )

  const res = await fetch(
    `${API_URL}/${resource}`,
    // { ...payload.payload },
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload.payload),
    }
  )

  const json = await res.json()

  return json as IResponse<E>
}

export async function apiPut<D, E>(
  resource: string,
  payload: IRequestPayload<D>
) {
  // const res = await axios.put(
  //   `${API_URL}/${resource}`,
  //   { ...payload.payload },
  //   {
  //     headers: {
  //       Accept: 'application/json',
  //     },
  //   }
  // )

  const res = await fetch(
    `${API_URL}/${resource}`,
    // { ...payload.payload },
    {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload.payload),
    }
  )

  const json = await res.json()

  return json as IResponse<E>
}

export async function apiDelete<D>(resource: string) {
  // const res = await axios.delete(`${API_URL}/${resource}`)
  const res = await fetch(`${API_URL}/${resource}`, { method: 'DELETE' })

  const json = await res.json()

  return {
    success: json.success,
    data: json.data,
  } as IResponse<D>
}
