import Button from '../common/Button'
import Image from '../common/Image'
import Logo from '../../assets/Logo.png'

function Header () {
  const imgStyles =
    'w-[75px] mr-10'
  const buttonStyles =
    'hover:bg-[#DFDFDF] rounded-xl px-3'
  const navbarStyles =
    'text-2xl flex p-3 px-5 bg-[#f0f0f0] rounded-full w-full gap-x-10 justify-center'
  const onClickMaterials = () => {
    window.location.assign('http://localhost:5173/material-menu')
  }
  const onClickLogout = () => {
    window.location.assign('http://localhost:5173/')
  }
  const onClick = () => {}

  const onClickMaterialExtraido = () => {
    window.location.assign('http://localhost:5173/extracted-materials')
  }

  return (
    <header className='flex w-full mt-6 px-14'>
      <Image
        src={Logo}
        alt='Cooperativa minera san pablo'
        className={imgStyles}
      />
      <nav className={navbarStyles}>
        <Button
          text='Materiales'
          type='button'
          className={buttonStyles}
          onClick={onClickMaterials}
        />
        <Button
          text='Ventas'
          type='button'
          className={buttonStyles}
          onClick={onClick}
        />
        <Button
          text='Inventario'
          type='button'
          className={buttonStyles}
          onClick={onClick}
        />
        <Button
          text='Material Extraido'
          type='button'
          className={buttonStyles}
          onClick={onClickMaterialExtraido}
        />
        <Button
          text='Salir'
          type='button'
          className={buttonStyles}
          onClick={onClickLogout}
        />
      </nav>
    </header>
  )
}

export default Header
