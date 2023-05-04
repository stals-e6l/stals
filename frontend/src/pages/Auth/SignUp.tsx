import React from 'react'

interface IProps {
  children?: React.ReactNode
}

const SignUp: React.FC<IProps> = () => {
  // state
  const [form, setForm] = React.useState<IUserSignUp>({
    username: '',
    password: '',
    email: '',
    role: 'admin',
  })

  const handleSignUp = () => {
    // TODO: pm's job lol
  }

  return (
    <div>
      <div>
        <label>Email</label>
        <input
          value={form.email}
          type="email"
          placeholder="email"
          onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
        />
      </div>
      <div>
        <label>Role</label>
        <select
          value={form.role}
          onChange={e => setForm(prev => ({ ...prev, role: e.target.value }))}
        >
          <option value="admin">Admin</option>
          <option value="owner">Owner</option>
          <option value="tenant">Tenant</option>
        </select>
        {/* <input
          value={form.passwordHash}
          type="email"
          placeholder="email"
          onChange={e =>
            setForm(prev => ({ ...prev, email: e.target.value }))
          }
        /> */}
      </div>
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
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  )
}

export default SignUp
