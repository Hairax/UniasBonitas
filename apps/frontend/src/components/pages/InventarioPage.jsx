import Header from '../layout/Header'
import { useState, useEffect } from 'react'
import { getInventario, postInventario } from '../../utils/Connections'
import ListaInventario from '../layout/ListaInventario'
import { FaPlus } from 'react-icons/fa'

function InventarioPage () {
  const [popupOpen, setPopupOpen] = useState(false)
  const [, setInventario] = useState([])

  const getInventarioList = async () => {
    setInventario(await getInventario())
  }
  useEffect(() => async () => {
    const fetchData = async () => {
      await getInventarioList()
    }
    const interval = setInterval(fetchData, 1000)
    return () => clearInterval(interval)
  }
  , [])
  const handlePopupOpen = () => {
    setPopupOpen(true)
  }
  
  const handlePopupClose = () => {
    setPopupOpen(false)
  }
  const [name, setName] = useState('')
  const [cantidad, setCantidad] = useState('')
  const [precioSugerido, setPrecioSugerido] = useState('')
  const handlePostInventario = async () => {
    await postInventario({
      name,
      cantidad,
      precioSugerido,
      date: new Date().toISOString()
    })
  }
  return (
    <div className="h-screen overflow-scroll bg-[#E6E6E6]">
      <div >
        <Header />
      </div>
      <div className="flex items-center bg-gradient-to-br from-black to-gray-900 w-[80%] h-[80%] rounded-lg shadow-lg m-auto mt-10 w-{80%} flex-col">
        <div className="flex flex-col items-center mt-8">
          <h1 className="text-3xl font-bold mb-2 text-center text-white font-serif">Inventario</h1>
        </div>
        <div className="flex flex-col items-center">
          <ListaInventario />
        </div>
        <div className="flex flex-col items-center">
                            <button
                                onClick={handlePopupOpen}
                                className="bg-blue-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg w-full transition duration-300 flex items-center gap-x-2"
                            >
                                <FaPlus />
                                Agregar Inventario
                            </button>
                            {popupOpen && (
                                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
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
                                            <h1 className="text-3xl font-bold mb-2 text-center text-white font-serif">Nuevo Producto</h1>
                                        </div>
                                        <form className="flex flex-col items-center">
                                            <div className="mb-4">
                                                <label className="block text-white font-bold mb-2" htmlFor="name">Nombre</label>
                                                <input
                                                type="text"
                                                id="name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="border border-gray-300 rounded-lg py-2 px-4 w-full"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-white font-bold mb-2" htmlFor="cantidad">Cantidad</label>
                                                <input
                                                type="number"
                                                id="cantidad"
                                                value={cantidad}
                                                onChange={(e) => setCantidad(e.target.value)}
                                                className="border border-gray-300 rounded-lg py-2 px-4 w-full"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-white font-bold mb-2" htmlFor="precioSugerido">Precio Sugerido</label>
                                                <input
                                                type="number"
                                                id="precioSugerido"
                                                value={precioSugerido}
                                                onChange={(e) => setPrecioSugerido(e.target.value)}
                                                className="border border-gray-300 rounded-lg py-2 px-4 w-full"
                                                />
                                            </div>
                                            <button
                                            type="submit"
                                            className="bg-red-500 text-white py-2 px-4 rounded-lg w-full"
                                            onClick={() => handlePostInventario()}
                                            >
                                            Guardar
                                            </button>
                                        </form>
                                        </div>
                                </div>        
                            )}
                        </div>
      </div>
    </div>
  )
}

export default InventarioPage
