import React from 'react'

interface IProps {
  children?: React.ReactNode
}

const ForumProvider: React.FC<IProps> = ({ children }) => {
  return (
    <forumContext.Provider
      value={{
        test: 'test',
      }}
    >
      {children}
    </forumContext.Provider>
  )
}

export default ForumProvider

const forumContext = React.createContext<IForumState>({
  // TODO:
  test: 'test',
})
