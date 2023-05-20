export default function toMap<T>(array: T[], key: string): IMap<T> | null {
  if (!array) return null

  const map = {} as IMap<T>

  array.forEach((element: any) => {
    const elKey = element[key]
    map[elKey] = element
  })

  return map
}
