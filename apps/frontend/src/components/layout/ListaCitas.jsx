import { useState, useEffect } from 'react'
import { getCitas, putCita, deleteCita } from '../../utils/Connections'

function ListaCitas () {
  const [citas, setCitas] = useState([])
  const [popupOpen, setPopupOpen] = useState(false)
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [details, setDetails] = useState('')
  const [cost, setCost] = useState('')

  const [idPut, setId] = useState('')

  const handlePopupOpen = async (id) => {
    console.log(id)
    setId(id)
    setPopupOpen(true)
    const cita = await getCitas()
    const citaFiltrada = cita.filter((cita) => cita.id === id)
    setName(citaFiltrada[0].name)
    setDate(citaFiltrada[0].date)
    setDetails(citaFiltrada[0].details)
    setCost(citaFiltrada[0].cost)
  }

  const handlePopupClose = () => {
    setPopupOpen(false)
  }
  const handleDeleteCita = async (id) => {
    try {
      console.log(id)
      await deleteCita(id)
      await getCitasList()
    } catch (error) {
      alert(`Error eliminando la venta: ${error}`)
    }
  }
  const getCitasList = async () => {
    setCitas(await getCitas())
  }

  const hadlePutCitas = async (id) => {
    console.log(id)
    await putCita(id, {
      id,
      name,
      date,
      details,
      cost
    }
    )

    handlePopupClose()
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

        <div className="flex flex-col items-center">

            <div className="grid grid-cols-8 gap-4 w-full p-5 justify-items-center">
                <div className="text-center text-white font-bold">Nombre</div>
                <div className="text-center text-white font-bold">Fecha</div>
                <div className="text-center text-white font-bold">Detalles</div>
                <div className="text-center text-white font-bold">Costo BS</div>
            </div>
            <section className="max-h-96 overflow-scroll">
                {citas
                  .map((cita, i) => (
                    <div key={i} className="grid grid-cols-8 gap-4 w-full p-5 justify-items-center">
                        <div className="text-center text-white">{cita.name}</div>
                        <div className="text-center text-white">{cita.date}</div>
                        <div className="text-center text-white">{cita.details}</div>
                        <div className="text-center text-white">{cita.cost}</div>
                        <div className="text-center text-white"><button onClick={() => handlePopupOpen(cita.id)} className="bg-blue-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg w-full transition duration-300 flex items-center gap-x-2">Editar</button></div>
                        <div className="text-center text-white"><button onClick={() => handleDeleteCita(cita.id)} className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg w-full transition duration-300 flex items-center gap-x-2">Eliminar</button></div>
                        {popupOpen && (
                            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-20 flex justify-center items-center">
                            <div className="bg-gradient-to-br from-black to-gray-900 p-8 rounded-lg shadow-lg w-96">
                                <div className="flex justify-end">
                                    <button
                                    className="text-black font-bold bg-white rounded-full w-6 h-6 flex justify-center items-center"
                                    onClick={handlePopupClose}
                                    >
                                    X
                                    </button>
                                </div>
                                <div className="mb-8">
                                    <h1 className="text-3xl font-bold mb-2 text-center text-white font-serif">Editar venta</h1>
                                </div>
                                <form className="flex flex-col items-center">
                                    <div className="mb-4 w-full">
                                    <input
                                        type="text"
                                        placeholder="Nombre"
                                        className="placeholder-gray-500 login-page__input w-full border-b-2 border-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:border-purple-500"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    </div>
                                    <div className="mb-4 w-full">
                                    </div>
                                    <div className="mb-4 w-full">
                                    <input
                                        type="text"
                                        placeholder="Detalles"
                                        className="placeholder-gray-500 login-page__input w-full border-b-2 border-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:border-purple-500"
                                        value={details}
                                        onChange={(e) => setDetails(e.target.value)}
                                    />
                                    </div>
                                    <div className="mb-4 w-full">
                                    <input
                                        type="number"
                                        placeholder="Costo"
                                        className="placeholder-gray-500 login-page__input w-full border-b-2 border-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:border-purple-500"
                                        value={cost}
                                        onChange={(e) => setCost(e.target.value)}
                                    />
                                    </div>
                                    <button
                                    type="button"
                                    className="bg-red-500 text-white py-2 px-4 rounded-lg w-full"
                                    onClick={() => hadlePutCitas(idPut)}
                                    >
                                    Guardar
                                    </button>
                                </form>
                                </div>
                            </div>
                        )}
                    </div>
                  ))}
            </section>
        </div>
  )
}

export default ListaCitas
