import Image from '../common/Image'
import Logo from '../../assets/Logo.png'
import LoginForm from './LoginForm'

function Login () {
  const loginStyles =
    'grid place-items-center w-2/6 text-center border-2 rounded-3xl bg-white p-10'
  return (
    <section className={loginStyles}>
      <h1 className='text-3xl'>
        COOPERATIVA MINERA <br/>
        &quot;NUEVA SAN PABLO R.L.&quot;
      </h1>
      <Image
        src={Logo}
        alt='Cooperativa minera Nueva San Pablo'
        className={'w-[200px]'}
      />
      <h2 className='text-2xl'>Log In</h2>
      <LoginForm />
    </section>
  )
}

export default Login
