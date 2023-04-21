import React from 'react'
import { retrieveForums } from '../../store/forum/actions'

interface IProps {
  children?: React.ReactNode
}

const RetrieveForums: React.FC<IProps> = () => {
  const forums = retrieveForums()

  // TODO: handle the ui when the forum is empty!
  if (forums.length === 0) {
    return <div>empty forum!</div>
  }

  return <div>{JSON.stringify(forums)}</div>
}

export default RetrieveForums
