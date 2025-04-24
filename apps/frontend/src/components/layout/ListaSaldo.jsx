import { useState, useEffect } from 'react'
import { getSaldo, putSaldo, deleteSaldo } from '../../utils/Connections'

function ListaSaldo () {
    const [saldo, setSaldo] = useState([])
    const [popupOpen, setPopupOpen] = useState(false)
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [tipo, setTipo] = useState('')
    const [saldoValue, setSaldoValue] = useState('')
    const [idPut, setId] = useState('')
    
    const handlePopupOpen = async (id) => {
        console.log(id)
        setId(id)
        setPopupOpen(true)
        const saldo = await getSaldo()
        const saldoFiltrado = saldo.filter((saldo) => saldo.id === id)
        setDescription(saldoFiltrado[0].description)
        setDate(saldoFiltrado[0].date)
        setSaldoValue(saldoFiltrado[0].saldo)
    }
    const handlePopupClose = () => {
        setPopupOpen(false)
    }
    const handleDeleteSaldo = async (id) => {
        try {
            console.log(id)
            await deleteSaldo(id)
            await getSaldoList()
        } catch (error) {
            alert(`Error eliminando saldo: ${error}`)
        }
    }
    const getSaldoList = async () => {
        setSaldo(await getSaldo())
    }
    const hadlePutSaldo = async (id) => {
        console.log(id)
        await putSaldo(id, {
            id,
            description,
            date,
            saldo: saldoValue,
            tipo
        }
        )

        handlePopupClose()
    }
    useEffect(() => async () => {
        const fetchData = async () => {
            await getSaldoList()
        }
        const interval = setInterval(fetchData, 1000)
        return () => clearInterval(interval)
    }
    , [])
return (
    <div className="flex flex-col items-center">
        <div className="grid grid-cols-6 gap-4 w-full p-5 justify-items-center">
            <div className="text-center text-white font-bold">Fecha</div>
            <div className="text-center text-white font-bold">Saldo</div>
            <div className="text-center text-white font-bold">Descripción</div>
            <div className="text-center text-white font-bold">Tipo</div>
        </div>
        <section className="max-h-96 overflow-scroll">
            {saldo.map((item, i) => (
                <div key={i} className="grid grid-cols-6 gap-4 w-full p-5 justify-items-center">
                    <div className="text-center text-white">{item.date}</div>
                    <div className="text-center text-white">{item.saldo}</div>
                    <div className="text-center text-white">{item.description}</div>
                    <div className="text-center text-white">{item.tipo}</div>
                    <div className="text-center text-white"><button 
                    className="bg-blue-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg w-full transition duration-300 flex items-center gap-x-2"
                    onClick={() => handlePopupOpen(item.id)}>Editar</button></div>
                    <div className="text-center text-white"><button 
                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg w-full transition duration-300 flex items-center gap-x-2"
                    onClick={() => handleDeleteSaldo(item.id)}>Eliminar</button></div>
                    {popupOpen && (
                        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-20 flex justify-center items-center">
                            <div className="bg-gradient-to-br from-black to-gray-900 p-8 rounded-lg shadow-lg w-96">
                                <div className="flex justify-end">
                                    <button
                                        onClick={handlePopupClose}
                                        className="text-black font-bold bg-white rounded-full w-6 h-6 flex justify-center items-center"
                                        >
                                        X
                                    </button>
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold mb-2 text-center text-white font-serif">Editar Saldo</h1>
                                    <p className="text-gray-600 mb-6 text-center">Por favor, edita el saldo</p>
                                </div>
                                <form className="flex flex-col items-center">
                                <p className="text-gray-600 mb-6 text-center">Descripcion</p>
                                <input
                                    type="text"
                                    className="placeholder-gray-500 login-page__input w-full border-b-2 border-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:border-purple-500 mb-4"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Descripción"
                                />
                                <p className="text-gray-600 mb-6 text-center">Saldo</p>
                                <input
                                    type="number"
                                    className="placeholder-gray-500 login-page__input w-full border-b-2 border-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:border-purple-500 mb-4"
                                    value={saldoValue}
                                    onChange={(e) => setSaldoValue(e.target.value)}
                                    placeholder="Saldo"
                                />
                                <p className="text-gray-600 mb-6 text-center">Tipo</p>
                                <select
                                    value={tipo}
                                    className="placeholder-gray-500 login-page__input w-full border-b-2 border-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:border-purple-500 mb-4"
                                    onChange={(e) => setTipo(e.target.value)}
                                    placeholder="Tipo"
                                >
                                    <option value="Ingreso">Ingreso</option>
                                    <option value="Egreso">Egreso</option>
                                </select>
                                <button 
                                    type="button"
                                    className="bg-red-500 text-white py-2 px-4 rounded-lg w-full"
                                    onClick={() => hadlePutSaldo(idPut)}>
                                    Guardar</button>
                                </form>
                            </div>
                        </div>
                    )

                    }
                </div>
            ))}
        </section>
    </div>
)
}

export default ListaSaldo