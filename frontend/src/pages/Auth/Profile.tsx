import React from 'react'

interface IProps {
  children?: React.ReactNode
}

const Profile: React.FC<IProps> = () => {
  const sampleUser: IUser = {
    username: 'vonzz',
    email: 'vfdivino@up.edu.ph',
    password: 'asdfsadfasdfasdfsadfasdfasdf', // this should not be displayed
    role: 'admin',
  }

  return (
    <div>
      <p>username: {sampleUser.username}</p>
      <p>email: {sampleUser.email}</p>
      <p>role: {sampleUser.role}</p>
    </div>
  )
}

export default Profile
