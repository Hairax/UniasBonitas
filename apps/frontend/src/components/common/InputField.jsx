import PropTypes from 'prop-types'

function InputField ({
  value,
  onChange,
  className,
  type
}) {
  return (
    <input
      value={value}
      className={`${className}`}
      onChange={(e) => onChange(e.target.value)}
      type={type}
    />
  )
}

InputField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'password', 'email', 'number', 'tel', 'url'])
}

export default InputField
