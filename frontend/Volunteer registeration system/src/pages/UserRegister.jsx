import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api, { setAuthToken } from '../api/api'

const UserRegister = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      const { data } = await api.post('/register', { name, email, password })
      // After registering, do not auto-login — redirect to login with a message
      navigate('/user/login', { state: { message: 'Registered successfully. Please sign in.' } })
    } catch (error) {
      const msg = error?.response?.data?.message || error?.message || 'Unable to register.'
      setMessage(msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='auth-page'>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className='auth-form'>
        <label>
          Name
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
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
          {isSubmitting ? 'Registering...' : 'Create account'}
        </button>
      </form>
      {message && <p className='auth-message'>{message}</p>}
      <p>
        Already have an account? <Link to='/user/login'>Login</Link>
      </p>
    </div>
  )
}

export default UserRegister
