import { useState } from 'react'

function LoginPage () {
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    // Verificar las credenciales del usuario
    if (username === 'MaryUñas' && password === 'Bonitas') {
      window.location.assign('http://localhost:5173/CitasPage')
    } else {
      alert('¡Usuario o contraseña incorrectos!')
    }
  }
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="bg-gradient-to-br from-pink-500 to-purple-700 h-screen flex justify-center items-center">
      <div className="bg-gradient-to-br from-pink-500 to-purple-900 p-8 rounded-lg shadow-lg w-96">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-center text-white font-serif">Mary Uñas Bonitas</h1>
          <h2 className="text-lg font-semibold mb-8 text-center text-white font-serif">El arte en tus manos... Solo con las mejores</h2>
        </div>
        <form className="flex flex-col items-center">
          <div className="mb-4 w-full">
            <input
              type="text"
              placeholder="Username"
              className="placeholder-gray-500 login-page__input w-full border-b-2 border-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:border-purple-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4 w-full relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="login-page__input w-full border-b-2 border-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:border-purple-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
              type="button"
              onClick={togglePasswordVisibility}
              className="bg-purple-500 text-white py-2 px-4 rounded-lg w-full mb-4"
            >
              {showPassword ? 'Ocultar Contraseña' : 'Mostrar Contraseña'}
            </button>
          <button type="submit"
            className="bg-red-500 text-white py-2 px-4 rounded-lg w-full"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
