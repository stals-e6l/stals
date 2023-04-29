import React from 'react'

interface IProps {
  children?: React.ReactNode
}

const Profile: React.FC<IProps> = () => {
  const sampleUser: IUser = {
    userName: 'vonzz',
    email: 'vfdivino@up.edu.ph',
    passwordHash: 'asdfsadfasdfasdfsadfasdfasdf', // this should not be displayed
    role: 'admin',
  }

  return (
    <div>
      <p>username: {sampleUser.userName}</p>
      <p>email: {sampleUser.email}</p>
      <p>role: {sampleUser.role}</p>
    </div>
  )
}

export default Profile
