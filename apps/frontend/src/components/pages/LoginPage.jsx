import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

function LoginPage () {
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const buttonStyles = 'bg-blue-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg w-full transition duration-300'

  const handleLogin = () => {
    if (username === 'user' && password === 'pasword') {
      window.location.href = '/CitasPage'
    } else {
      alert('¡Usuario o contraseña incorrectos!')
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="bg-[#E6E6E6] h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-96">
        <h1 className="text-2xl font-bold text-purple-700 mb-2 text-center">Bienvenido</h1>
        <p className="text-gray-600 mb-6 text-center">Por favor, inicia sesión para continuar</p>
        <form className="flex flex-col items-center">
          <div className="mb-4 w-full">
            <label htmlFor="username" className="block text-gray-700 font-medium mb-2">Usuario</label>
            <input
              id="username"
              type="text"
              placeholder="Ingresa tu usuario"
              className="placeholder-gray-500 login-page__input w-full border border-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4 w-full relative">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Contraseña</label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Ingresa tu contraseña"
              className="login-page__input w-full border border-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-9 text-gray-500 hover:text-purple-500"
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button
            type="button"
            className={buttonStyles}
            onClick={handleLogin}
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
