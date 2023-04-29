import React from 'react'

interface IProps {
  children?: React.ReactNode
}

const SignIn: React.FC<IProps> = () => {
  // states
  const [form, setForm] = React.useState<IUserSignIn>({
    userName: '',
    passwordHash: '',
  })

  const handleSignIn = () => {
    // TODO: handle sign in (PM's job)
  }

  return (
    <div>
      <div>
        <label>Username</label>
        <input
          value={form.userName}
          type="text"
          placeholder="username"
          onChange={e =>
            setForm(prev => ({ ...prev, username: e.target.value }))
          }
        />
      </div>
      <div>
        <label>Password</label>
        <input
          value={form.passwordHash}
          type="password"
          placeholder="password"
          onChange={e =>
            setForm(prev => ({ ...prev, passwordHash: e.target.value }))
          }
        />
      </div>
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  )
}

export default SignIn
