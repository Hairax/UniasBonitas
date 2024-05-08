import PropTypes from 'prop-types'

function Button ({
  className,
  text,
  onClick,
  type = 'submit' | 'reset' | 'button'
}) {
  return (
    <button onClick={onClick} className={`${className}`} type={type}>{text}</button>
  )
}

Button.propTypes = {
  className: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['submit', 'reset', 'button'])
}

export default Button
