import React from 'react'

interface IProps {
  children?: React.ReactNode
}

const ForumProvider: React.FC<IProps> = ({ children }) => {
  // states
  const [forums, setForums] = React.useState<IForum[]>([])
  const [current_accommodation, setCurrentAccommodation] = React.useState<
    string | undefined
  >()

  return (
    <forumContext.Provider
      value={{
        forums,
        current_accommodation,
      }}
    >
      {children}
    </forumContext.Provider>
  )
}

export default ForumProvider

const forumContext = React.createContext<IForumState>({
  forums: [],
})
