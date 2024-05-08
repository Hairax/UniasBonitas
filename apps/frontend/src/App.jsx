import { Navigate, Routes, Route } from 'react-router-dom'
import LoginPage from './components/pages/LoginPage'
import MaterialMenuPage from './components/pages/MaterialMenuPage'
import MaterialInfoPage from './components/pages/MaterialInfoPage'
import ExtractedMaterialsPage from './components/pages/ExtractedMaterialsPage'
import SelledMaterialPage from './components/pages/SelledMaterialPage'

function App () {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Navigate to={'/login'} />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/material-menu' element={<MaterialMenuPage />} />
        <Route path='/material-info/:id' element={<MaterialInfoPage />}/>
        <Route path='/extracted-materials' element={<ExtractedMaterialsPage />} />
        <Route path='/selled-material/:id' element={<SelledMaterialPage />} />
      </Routes>
    </div>
  )
}

export default App
