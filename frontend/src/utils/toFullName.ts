const toFullName = (full_name: { first_name: string; last_name: string }) => {
  return `${full_name.first_name} ${full_name.last_name}`
}

export default toFullName
