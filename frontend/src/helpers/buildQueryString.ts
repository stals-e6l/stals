export default function buildQueryString(filter: IAccommodationsFilter) {
  let queryString = ''
  if (filter.name) queryString = `${queryString}name=${filter.name}`
  if (filter.type) queryString = `${queryString}&type=${filter.type}`
  if (filter.furnishing)
    queryString = `${queryString}&furnishing=${filter.furnishing}`
  if (filter.size_sqm)
    queryString = `${queryString}&size_sqm=${filter.size_sqm}`
  if (filter.min_pax) queryString = `${queryString}&min_pax=${filter.min_pax}`
  if (filter.max_pax) queryString = `${queryString}&max_pax=${filter.max_pax}`
  if (filter.meters_from_uplb)
    queryString = `${queryString}&meters_from_uplb=${filter.meters_from_uplb}`
  if (filter.num_beds)
    queryString = `${queryString}&num_beds=${filter.num_beds}`
  if (filter.num_rooms)
    queryString = `${queryString}&num_rooms=${filter.num_rooms}`
  if (filter.price) queryString = `${queryString}&price=${filter.price}`
  return queryString
}
