import Header from '../layout/Header'
import { useState } from 'react'

function CitasPage () {
  const [popupOpen, setPopupOpen] = useState(false)

  const handlePopupOpen = () => {
    setPopupOpen(true)
  }

  const handlePopupClose = () => {
    setPopupOpen(false)
  }

  return (
    <div className="h-screen overflow-scroll bg-gradient-to-br from-pink-500 to-purple-700">
      <div >
        <Header />
      </div>
      <div className="flex justify-center items-center bg-gradient-to-br from-black to-gray-900 w-[80%] h-[80%] rounded-lg shadow-lg m-auto mt-10 w-{80%} flex-col">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-2 text-center text-white font-serif">Citas</h1>
            <h2 className="text-lg font-semibold mb-8 text-center text-white font-serif">Elige la fecha y hora de tu cita</h2>
          </div>
          <div className="flex flex-col items-center">
            <button
              className="bg-purple-500 text-white py-2 px-4 rounded-lg w-full mb-4"
              onClick={handlePopupOpen}
            >
              Nueva Cita
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
                    <h1 className="text-3xl font-bold mb-2 text-center text-white font-serif">Nueva Cita</h1>
                    <h2 className="text-lg font-semibold mb-8 text-center text-white font-serif">Elige la fecha y hora de tu cita</h2>
                  </div>
                  <form className="flex flex-col items-center">
                    <div className="mb-4 w-full">
                      <input
                        type="text"
                        placeholder="Nombre"
                        className="placeholder-gray-500 login-page__input w-full border-b-2 border-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div className="mb-4 w-full">
                      <input
                        type = "date"
                        placeholder="Fecha"
                        className="placeholder-gray-500 login-page__input w-full border-b-2 border-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div className="mb-4 w-full">
                      <input
                        type="time"
                        placeholder="Hora"
                        className="placeholder-gray-500 login-page__input w-full border-b-2 border-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-red-500 text-white py-2 px-4 rounded-lg w-full"
                      onClick={handlePopupClose}
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

export default CitasPage
