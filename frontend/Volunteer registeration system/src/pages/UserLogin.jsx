import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import api, { setAuthToken } from '../api/api'

const UserLogin = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      const { data } = await api.post('/login', { email, password })
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('userName', data.user.name)
      setAuthToken(data.accessToken)
      navigate('/user/dashboard')
    } catch (error) {
      const msg = error?.response?.data?.message || error?.message || 'Unable to login.'
      setMessage(msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='auth-page'>
      <h1>Sign in</h1>
      <form onSubmit={handleSubmit} className='auth-form'>
        <label>
          Email
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
      {message && <p className='auth-message'>{message}</p>}
      <p>
        Need an account? <Link to='/user/register'>Register</Link>
      </p>
    </div>
  )
}

export default UserLogin
