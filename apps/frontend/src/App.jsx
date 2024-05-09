import { Navigate, Routes, Route } from 'react-router-dom'
import LoginPage from './components/pages/LoginPage'
import CitasPage from './components/pages/CitasPage'
import './App.css'

function App () {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Navigate to={'/login'} />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/CitasPage' element={<CitasPage />} />
      </Routes>
    </div>
  )
}

export default App
