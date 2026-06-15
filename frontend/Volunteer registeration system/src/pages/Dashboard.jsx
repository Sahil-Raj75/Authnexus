import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API_BASE = 'http://localhost:3000/api/auth'

const Dashboard = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) {
      navigate('/user/login')
      return
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch(`${API_BASE}/profile`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          credentials: 'include',
        })

        if (!response.ok) {
          localStorage.removeItem('accessToken')
          localStorage.removeItem('userName')
          navigate('/user/login')
          return
        }

        const data = await response.json()
        setUser(data.user)
      } catch (err) {
        setError('Unable to load dashboard. Please login again.')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [navigate])

  const handleLogout = () => {
    // removed logout behavior per request; users are redirected to login if token invalid
  }

  if (loading) {
    return <div className='dashboard-page'>Loading dashboard...</div>
  }

  return (
    <div className='dashboard-page'>
      <h1>Dashboard</h1>
      {error ? (
        <p className='auth-message'>{error}</p>
      ) : (
        <>
          <p className='welcome'>Welcome back, {user?.name || localStorage.getItem('userName')}</p>
          <div className='profile-card'>
            <div className='avatar'>{(user?.name || '').charAt(0).toUpperCase()}</div>
            <div className='profile-info'>
              <div className='profile-name'>{user?.name || localStorage.getItem('userName')}</div>
              <div className='profile-email'>{user?.email}</div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Dashboard
