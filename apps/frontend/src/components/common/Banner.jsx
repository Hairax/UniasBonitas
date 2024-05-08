import PropTypes from 'prop-types'

function Banner ({
  text,
  src,
  classNameText
}) {
  return (
    <div className='flex mt-5 bg-cover bg-center ' style={{
      backgroundImage: `url(${src})`,
      height: '25vh'

    }}>
      <h1 className={`${classNameText} absolute w-screen text-white text-center`} style={
        { top: '20%', fontSize: '3rem' }
      }>{text}</h1>
    </div>

  )
}

Banner.propTypes = {
  text: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  classNameImg: PropTypes.string.isRequired,
  classNameText: PropTypes.string.isRequired
}

export default Banner
