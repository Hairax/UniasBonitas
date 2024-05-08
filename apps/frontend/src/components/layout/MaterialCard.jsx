import PropTypes from 'prop-types'
import Button from '../common/Button'
import Image from '../common/Image'

function MaterialCard ({
  materialName,
  materialImage,
  materialPrice,
  materialQuantity,
  onClick
}) {
  return (
    <div className='grid grid-cols-3 w-3/4 bg-[#f0f0f0] rounded-xl p-4'>
      <Image src={materialImage} alt={materialName} className='col-span-1 col-start-1 w-40 h-40' />
      <section className='grid col-span-2 col-start-2 w-full text-xl pl-6'>
        <h1 className='text-3xl text-center'>{materialName}</h1>
        <div>
          <p>Precio: {materialPrice} Bs/Tonelada</p>
          <p>Unidades: {materialQuantity} Toneladas</p>
        </div>
        <Button
          text='Mas Informacion'
          className=
          'bg-black text-white rounded-xl mt-4 hover:bg-gray-900'
          onClick={onClick}
        />
      </section>
    </div>
  )
}

MaterialCard.propTypes = {
  materialName: PropTypes.string.isRequired,
  materialImage: PropTypes.string.isRequired,
  materialPrice: PropTypes.string.isRequired,
  materialQuantity: PropTypes.string.isRequired,
  onClick: PropTypes.func
}

export default MaterialCard
