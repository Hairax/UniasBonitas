import { useState, useEffect } from 'react'
import { getInventario, putInventario, deleteInventario } from '../../utils/Connections'

function ListaInventario () {
  const [inventario, setInventario] = useState([])
  const [popupOpen, setPopupOpen] = useState(false)
  const [name, setName] = useState('')
  const [cantidad, setCantidad] = useState('')
  const [precioSugerido, setPrecioSugerido] = useState('')
  const [idPut, setId] = useState('')

  const handlePopupOpen = async (id) => {
    setId(id)
    setPopupOpen(true)
    const inventario = await getInventario()
    const inventarioFiltrado = inventario.filter((inventario) => inventario.id === id)
    setName(inventarioFiltrado[0].name)
    setCantidad(inventarioFiltrado[0].cantidad)
    setPrecioSugerido(inventarioFiltrado[0].precioSugerido)
  }
  const handlePopupClose = () => {
    setPopupOpen(false)
  }
  const handleDeleteInventario = async (id) => {
    try {
      await deleteInventario(id)
      await getInventarioList()
    } catch (error) {
      alert(`Error eliminando inventario: ${error}`)
    }
  }
  const getInventarioList = async () => {
    setInventario(await getInventario())
  }
  const hadlePutInventario = async (id) => {
    await putInventario(id, {
      id,
      name,
      cantidad,
      precioSugerido
    }
    )

    handlePopupClose()
  }
  useEffect(() => async () => {
    const fetchData = async () => {
      await getInventarioList()
    }
    const interval = setInterval(fetchData, 1000)
    return () => clearInterval(interval)
  }
  , [])
return (
  <div className="flex flex-col items-center">
    <div className="grid grid-cols-6 gap-4 w-full p-5 justify-items-center">
      <div className="text-center text-white font-bold">Nombre Producto</div>
      <div className="text-center text-white font-bold">Catidad disponible</div>
      <div className="text-center text-white font-bold">PrecioSugerido</div>
    </div>
  <section className="overflow-y-auto h-96 w-full">
    {inventario.map((inventario) => (
      <div key={inventario.id} className="grid grid-cols-6 gap-4 w-full p-5 justify-items-center">
        <div className="text-center text-white">{inventario.name}</div>
        <div className="text-center text-white">{inventario.cantidad}</div>
        <div className="text-center text-white">{inventario.precioSugerido}</div>
          <div className="text-center text-white">
          <button onClick={() => handlePopupOpen(inventario.id)} className="bg-blue-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg w-full transition duration-300 flex items-center gap-x-2">
            Editar
          </button>
          </div>
          <div className="text-center text-white">
          <button onClick={() => handleDeleteInventario(inventario.id)} className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg w-full transition duration-300 flex items-center gap-x-2">
            Eliminar
          </button>
          </div>
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
                <h1 className="text-3xl font-bold mb-2 text-center text-white font-serif">Editar Inventario</h1>
                <input type="text" 
                                                    className="placeholder-gray-500 login-page__input w-full border-b-2 border-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:border-purple-500 mb-4"
                                                    value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" />
                <input type="number" 
                                                    className="placeholder-gray-500 login-page__input w-full border-b-2 border-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:border-purple-500 mb-4"
                                                    value={cantidad} onChange={(e) => setCantidad(e.target.value)} placeholder="Cantidad" />
                <input type="number" 
                                                    className="placeholder-gray-500 login-page__input w-full border-b-2 border-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:border-purple-500 mb-4"
                                                    value={precioSugerido} onChange={(e) => setPrecioSugerido(e.target.value)} placeholder="Precio Sugerido" />
                <button                                     className="bg-red-500 text-white py-2 px-4 rounded-lg w-full"

onClick={() => hadlePutInventario(idPut)}>Guardar</button>
              </div>
            </div>
          )}
      </div>
    ))}
  </section>
</div>  
)
  
}

export default ListaInventario
