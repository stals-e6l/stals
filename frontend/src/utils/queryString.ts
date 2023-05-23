import queryString from 'query-string'

export function buildQueryString(filter: IAccommodationsFilter) {
  const qs = queryString.stringify(filter)
  return qs
}

export function extractQueryString(url: string) {
  const obj = queryString.parse(url)
  return obj as IAccommodationsFilter
}
