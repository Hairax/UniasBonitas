import Image from '../common/Image'
import Logo from '../../assets/Logo.png'

function Header () {
  const imgStyles =
    'w-[75px] mr-10 mt-4'
  const buttonStyles =
    'hover:bg-gray-700 text-white py-2 px-4 rounded-lg'
  const navbarStyles =
    'text-2xl flex p-3 px-5 rounded-full w-full gap-x-10 bg-gradient-to-br from-black to-gray-800 justify-end'

  const onClickLogout = () => {
    window.location.assign('http://localhost:5173/')
  }

  const onClickCitas = () => {
    window.location.assign('http://localhost:5173/CitasPage')
  }

  const onClickReservas = () => {
  //  window.location.assign('http://localhost:5173/ReservasPage')
  }

  return (
    <header className='flex w-full px-14 bg-gradient-to-br from-black to-gray-800'>
      <Image
        src={Logo}
        alt='Mari Uñas Bonitas Logo'
        className={imgStyles}
      />
      <nav className={navbarStyles}>
        <button
          type='button'
          className={buttonStyles}
          onClick={onClickCitas}
        >
          Citas
        </button>
        <button
          type='button'
          className={buttonStyles}
          onClick={onClickReservas}
        >
          Reservas
        </button>
        <button
          type='button'
          className={buttonStyles}
          onClick={onClickLogout}
        >
          Salir
        </button>
      </nav>
    </header>
  )
}

export default Header
