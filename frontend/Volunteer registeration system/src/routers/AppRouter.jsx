import { Route, Routes, Navigate } from 'react-router-dom'
import UserRegister from '../pages/UserRegister'
import UserLogin from '../pages/UserLogin'
import Dashboard from '../pages/Dashboard'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/user/register' element={<UserRegister />} />
      <Route path='/user/login' element={<UserLogin />} />
      <Route path='/user/dashboard' element={<Dashboard />} />
    </Routes>
  )
}

export default AppRoutes;