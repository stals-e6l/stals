// This functions converts a string to sentence case format (e.g. transient space to Transient Space)
function toSentenceCase(str: string) {
  str = str.toLowerCase()
  const strSplit = str.split(' ')

  for (let i = 0; i < strSplit.length; i++) {
    strSplit[i] = strSplit[i].charAt(0).toUpperCase() + strSplit[i].slice(1)
  }

  return strSplit.join(' ')
}

export default toSentenceCase
