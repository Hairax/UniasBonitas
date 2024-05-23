import Header from '../layout/Header'
import { useState, useEffect } from 'react'
import { getCitas } from '../../utils/Connections'
import ListaReports from '../layout/ListaReports'

function Reports () {
  const [citas, setCitas] = useState([])

  const getCitasList = async () => {
    setCitas(await getCitas())
  }

  useEffect(() => async () => {
    const fetchData = async () => {
      await getCitasList()
    }
    const interval = setInterval(fetchData, 1000)
    return () => clearInterval(interval)
  }
  , [])

  return (
    <div className="h-screen overflow-scroll bg-gradient-to-br from-pink-500 to-purple-700">
      <div >
        <Header />
      </div>
      <div className="flex items-center bg-gradient-to-br from-black to-gray-900 w-[80%] h-[80%] rounded-lg shadow-lg m-auto mt-10 w-{80%} flex-col">
          <div className="flex flex-col items-center mt-8">
            <h1 className="text-3xl font-bold mb-2 text-center text-white font-serif">Reportes</h1>
          </div>
          <div className="flex flex-col items-center">
            <ListaReports />
          </div>
          <div className="flex flex-col items-center">
            <div className="border-b-2 border-white w-[90%]"></div>
            <div className="text-center text-white font-bold"> Total de Citas: {citas.length} </div>
            <div className="text-center text-white font-bold"> Total de Citas Pagadas: {citas.filter(cita => cita.state === 'Pagado').length} -- Ingreso:   {citas.filter(cita => cita.state === 'Pagado').reduce((acc, cita) => acc + parseFloat(cita.cost), 0)}Bs </div>
            <div className="text-center text-white font-bold"> Total de Citas Reservadas: {citas.filter(cita => cita.state === 'Reserva').length} </div>
            <div className="text-center text-white font-bold"> Total de Citas Canceladas: {citas.filter(cita => cita.state === 'Cancelado').length} </div>
            </div>
      </div>
    </div>
  )
}

export default Reports
