import React from 'react'

interface IProps {
  children?: React.ReactNode
}

const ReportsProvider: React.FC<IProps> = ({ children }) => {
  return <div>{children}</div>
}

export default ReportsProvider
