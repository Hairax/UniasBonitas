import { Navigate, Routes, Route } from 'react-router-dom'
import LoginPage from './components/pages/LoginPage'
import CitasPage from './components/pages/CitasPage'
import Reports from './components/pages/Reports'
import ReservasPage from './components/pages/ReservasPage'
import './App.css'

function App () {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Navigate to={'/login'} />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/CitasPage' element={<CitasPage />} />
        <Route path='/Reports' element={<Reports />} />
        <Route path='/ReservasPage' element={<ReservasPage />} />
      </Routes>
    </div>
  )
}

export default App
