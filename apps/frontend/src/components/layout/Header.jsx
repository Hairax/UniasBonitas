function Header () {
  const buttonStyles =
    'hover:bg-gray-700 text-white py-2 px-4 rounded-lg'
  const navbarStyles =
    'text-2xl flex p-3 px-5 rounded-full w-full gap-x-10 bg-gradient-to-br from-black to-gray-800 justify-end'

  const onClickLogout = () => {
    window.location.assign('http://localhost:5173/')
  }

  const onClickCitas = () => {
    window.location.assign('http://localhost:5173/InventarioPage')
  }

  const onClickReservas = () => {
    window.location.assign('http://localhost:5173/VentasPage')
  }

  const onClickReportes = () => {
    window.location.assign('http://localhost:5173/Reports')
  }

  const onClickSaldo = () => {
    window.location.assign('http://localhost:5173/SaldoPage')
  }

  return (
    <header className='flex w-full px-14 bg-gradient-to-br from-black to-gray-800'>
      <nav className={navbarStyles}>
        <button
          type='button'
          className={buttonStyles}
          onClick={onClickCitas}
        >
          Inventario
        </button>
        <button
          type='button'
          className={buttonStyles}
          onClick={onClickReservas}
        >
          Ventas
        </button>
        <button
          type='button'
          className={buttonStyles}
          onClick={onClickSaldo}
        >
          Saldo
        </button>
        <button
          type='button'
          className={buttonStyles}
          onClick={onClickReportes}
        >
          Reporte
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
