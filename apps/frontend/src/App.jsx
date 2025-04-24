import { Navigate, Routes, Route } from 'react-router-dom'
import LoginPage from './components/pages/LoginPage'
import CitasPage from './components/pages/CitasPage'
import Reports from './components/pages/Reports'
import InventarioPage from './components/pages/InventarioPage'
import SaldoPage from './components/pages/SaldoPage'
import Venta from './components/pages/Venta'
import './App.css'

function App () {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Navigate to={'/login'} />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/VentasPage' element={<CitasPage />} />
        <Route path='/Reports' element={<Reports />} />
        <Route path='/InventarioPage' element={<InventarioPage />} />
        <Route path='/SaldoPage' element={<SaldoPage />} />
        <Route path='/Venta' element={<Venta/>} />
      </Routes>
    </div>
  )
}

export default App
