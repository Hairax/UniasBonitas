import { useState, useEffect } from 'react'
import { getCitas, putCita, deleteCita } from '../../utils/Connections'

function ListaReserva () {
  const [citas, setCitas] = useState([])
  const [popupOpen, setPopupOpen] = useState(false)
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [details, setDetails] = useState('')
  const [stateCita, setStateCita] = useState('')
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
    setTime(citaFiltrada[0].time)
    setDetails(citaFiltrada[0].details)
    setStateCita(citaFiltrada[0].state)
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
      alert(`Error eliminando cita: ${error}`)
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
      time,
      details,
      state: stateCita,
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
                <div className="text-center text-white font-bold">Hora</div>
                <div className="text-center text-white font-bold">Detalles</div>
                <div className="text-center text-white font-bold">Estado</div>
                <div className="text-center text-white font-bold">Costo BS</div>
                <div className="text-center text-white font-bold">Editar</div>
                <div className="text-center text-white font-bold">Eliminar</div>
            </div>
            <section className="max-h-96 overflow-scroll">
                {citas
                  .sort((a, b) => {
                    const dateA = new Date(`${a.date}T${a.time}`)
                    const dateB = new Date(`${b.date}T${b.time}`)
                    return dateA - dateB
                  })
                  .filter(cita => cita.state === 'Reserva')
                  .map((cita, i) => (
                    <div key={i} className="grid grid-cols-8 gap-4 w-full p-5 justify-items-center">
                        <div className="text-center text-white">{cita.name}</div>
                        <div className="text-center text-white">{cita.date}</div>
                        <div className="text-center text-white">{cita.time}</div>
                        <div className="text-center text-white">{cita.details}</div>
                        <div className="text-center text-white">{cita.state}</div>
                        <div className="text-center text-white">{cita.cost}</div>
                        <div className="text-center text-white"><button onClick={() => handlePopupOpen(cita.id)}>Editar</button></div>
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
                                    <h1 className="text-3xl font-bold mb-2 text-center text-white font-serif">Editar Cita</h1>
                                    <h2 className="text-lg font-semibold mb-8 text-center text-white font-serif">Elige la fecha y hora de tu cita</h2>
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
                                    <input
                                        type = "date"
                                        placeholder="Fecha"
                                        className="placeholder-gray-500 login-page__input w-full border-b-2 border-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:border-purple-500"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                    </div>
                                    <div className="mb-4 w-full">
                                    <input
                                        type="time"
                                        placeholder="Hora"
                                        className="placeholder-gray-500 login-page__input w-full border-b-2 border-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:border-purple-500"
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                    />
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
                                    <select
                                      className="placeholder-gray-500 login-page__input w-full border-b-2 border-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:border-purple-500"
                                      value={stateCita}
                                      onChange={(e) => setStateCita(e.target.value)}
                                    >
                                      <option value="Reserva">Reserva</option>
                                      <option value="Cancelado">Cancelado</option>
                                      <option value="Pagado">Pagado</option>
                                    </select>
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
                        <div className="text-center text-white"><button onClick={() => handleDeleteCita(cita.id)}>Eliminar</button></div>
                    </div>
                  ))}
            </section>
        </div>
  )
}

export default ListaReserva
