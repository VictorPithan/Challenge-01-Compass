import { Route, Routes } from 'react-router-dom'

import { Register } from './pages/Register'
import { SignIn } from './pages/SignIn'
import { Home } from './pages/Home'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  )
}
