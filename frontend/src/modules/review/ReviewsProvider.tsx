import React from 'react'

interface IProps {
  children?: React.ReactNode
}

const ReviewsProvider: React.FC<IProps> = ({ children }) => {
  return <div>{children}</div>
}

export default ReviewsProvider
