import Image from './Image'
import LoadingIcon from '../../assets/LoadingGif.gif'
import PropTypes from 'prop-types'

function Loading ({
  className
}) {
  return (
    <div className={`${className}`}>
      <Image src={LoadingIcon} alt='Load Icon'/>
    </div>
  )
}

Loading.propTypes = {
  className: PropTypes.string
}

export default Loading
