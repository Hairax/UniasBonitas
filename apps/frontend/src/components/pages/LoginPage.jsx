import BackgroundImage from '../../assets/LoginBackground.jpeg'
import Login from '../layout/Login'

function LoginPage () {
  return (
    <div
      className='flex h-screen bg-cover bg-center justify-center items-center'
      style={{
        backgroundImage: `url(${BackgroundImage})`
      }}
    >
      <Login />
    </div>
  )
}

export default LoginPage
