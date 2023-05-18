export default function toArray<T>(map: IMap<T>) {
  if (!map) return null

  const array = Object.values(map)
  return array
}
