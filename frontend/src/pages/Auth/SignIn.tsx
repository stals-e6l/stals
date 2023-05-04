import React from 'react'
import { signIn } from '../../store/auth/action'
import { useNavigate } from 'react-router-dom'

interface IProps {
  children?: React.ReactNode
}

const SignIn: React.FC<IProps> = () => {
  // hooks
  const signInHandler = signIn()
  // states
  const [form, setForm] = React.useState<IUserSignIn>({
    username: '',
    password: '',
  })

  const handleSignIn = () => {
    signInHandler(form).then(() => {
      window.location.pathname = '/accommodations'
    })
  }

  return (
    <div>
      <div>
        <label>Username</label>
        <input
          value={form.username}
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
          value={form.password}
          type="password"
          placeholder="password"
          onChange={e =>
            setForm(prev => ({ ...prev, password: e.target.value }))
          }
        />
      </div>
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  )
}

export default SignIn
