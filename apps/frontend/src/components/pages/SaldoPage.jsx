import Header from '../layout/Header'
import { useState, useEffect } from 'react'
import { getSaldo, postSaldo } from '../../utils/Connections'
import ListaSaldo from '../layout/ListaSaldo'
import { FaPlus } from 'react-icons/fa'

function SaldoPage () {
    const [popupOpen, setPopupOpen] = useState(false)
    const [, setSaldo] = useState([])

    const getSaldoList = async () => {
        setSaldo(await getSaldo())
    }
    useEffect(() => async () => {
        const fetchData = async () => {
            await getSaldoList()
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

    const [saldoValue, setSaldoValue] = useState('')
    const [description, setDescription] = useState('')
    const [tipo, setTipo] = useState('')
    const handlePostSaldo = async () => {
        await postSaldo({
            saldo: saldoValue,
            description,
            tipo,
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
                    <h1 className="text-3xl font-bold mb-2 text-center text-white font-serif">Saldo</h1>
                </div>
                <div className="flex flex-col items-center">
                    <ListaSaldo />
                </div>
                <div className="flex flex-col items-center">
                    <button
                        onClick={handlePopupOpen}
                        className="bg-blue-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg w-full transition duration-300 flex items-center gap-x-2"
                    >
                        <FaPlus />
                        Agregar Saldo
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
                                    <h1 className="text-3xl font-bold mb-2 text-center text-white font-serif">Nuevo movimiento</h1>
                                </div>
                                <form className="flex flex-col items-center">
                                    <div className="mb-4 w-full">
                                    <input
                                        type="number"
                                        placeholder="Saldo Valor"
                                        className="placeholder-gray-500 login-page__input w-full border-b-2 border-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:border-purple-500"
                                        value={saldoValue}
                                        onChange={(e) => setSaldoValue(e.target.value)}
                                    />
                                    </div>
                                    <div className="mb-4 w-full">
                                        <input
                                            type="text"
                                            placeholder="Descripción"
                                            className="placeholder-gray-500 login-page__input w-full border-b-2 border-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:border-purple-500"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-4 w-full">
                                        <select
                                            value={tipo}
                                            className="placeholder-gray-500 login-page__input w-full border-b-2 border-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:border-purple-500"
                                            onChange={(e) => setTipo(e.target.value)}
                                        >
                                            <option value="Ingreso">Ingreso</option>
                                            <option value="Egreso">Egreso</option>
                                        </select>
                                    </div>
                                    <button
                                    type="submit"
                                    className="bg-red-500 text-white py-2 px-4 rounded-lg w-full"
                                    onClick={() => handlePostSaldo()}
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

export default SaldoPage