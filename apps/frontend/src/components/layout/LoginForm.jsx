import Button from '../common/Button'
import InputField from '../common/InputField'
import { useState } from 'react'

function LoginForm () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const inputFieldStyles =
    'rounded-md border-2 p-2 w-full text-xl border-[#c9c9c9]'
  const labelStyles =
    'text-md text-[#666]'
  const formStyles =
    'grid grid-rows-3 w-full p-5 gap-y-5 text-left'
  const buttonStyles =
    'bg-[#3E3E3E] text-white rounded-full h-3/4 w-full text-xl'
  const onClick = (e) => {
    e.preventDefault()
    if (username === 'admin' && password === 'admin123') {
      window.location.assign('http://localhost:5173/material-menu')
    }
  }

  return (
    <form className={formStyles}>
      <div>
        <label className={labelStyles}>Nombre de usuario</label>
        <InputField
          type={'text'}
          value={username}
          onChange={(value) => setUsername(value)}
          className={inputFieldStyles}
        />
      </div>
      <div>
        <label className={labelStyles}>Contraseña</label>
        <InputField
          type={'password'}
          value={password}
          onChange={(value) => setPassword(value)}
          className={inputFieldStyles}
        />
      </div>
      <Button
        text={'Log In'}
        type={'submit'}
        onClick={onClick}
        className={buttonStyles}
      />
    </form>
  )
}

export default LoginForm
