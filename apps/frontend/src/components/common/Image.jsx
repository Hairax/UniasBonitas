import PropTypes from 'prop-types'

function Image ({
  className,
  width,
  height,
  src,
  alt
}) {
  return (
    <div>
      <img
        src={src}
        alt={alt}
        className={`${className}`}
        width={width}
        height={height}/>
    </div>
  )
}

Image.propTypes = {
  className: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
}

export default Image
