import { useNavigate } from 'react-router-dom'
import Button from '../common/Button'
import Image from '../common/Image'
import PropTypes from 'prop-types'
import { useCallback } from 'react'

function MaterialsInfoCard ({
  materialId,
  materialExtracted,
  materialSold,
  materialAvailableForSaleWeight,
  materialAvailableForSalePrice,
  materialName,
  materialImage
}) {
  const h2Style = 'text-2xl font-bold'
  const pStyle = 'text-xl'
  const buttonStyle = 'bg-black text-white rounded-xl p-3 text-2xl mt-4 hover:bg-gray-900'
  const navigate = useNavigate()
  const onClickBack = useCallback(
    () => {
      navigate(-1)
    }, [navigate]
  )
  const onClickReport = useCallback(
    (id) => {
      navigate(`/selled-material/${id}`)
    }, [navigate]
  )

  return (
    <section className='bg-[#f0f0f0] rounded-xl w-4/6 p-8'>
    <div className='flex'>
      <Image src={materialImage} alt='Material image' className={'w-5/6'}/>
      <div className='grid w-full'>
        <h1 className='text-4xl text-center'>{materialName}</h1>
        <div className='grid grid-cols-2 gap-4 grid-rows-2 p-5'>
          <div>
            <h2 className={h2Style}>Material Extraido:</h2>
            <p className={pStyle}>Peso total: {materialExtracted} Toneladas</p>
          </div>
          <div>
            <h2 className={h2Style}>Unidades disponibles para la venta:</h2>
            <p className={pStyle}>Peso total: {materialAvailableForSaleWeight} Toneladas</p>
            <p className={pStyle}>Precio de venta: Bs. {materialAvailableForSalePrice}</p>
          </div>
          <div>
            <h2 className={h2Style}>Material Vendido:</h2>
            <p className={pStyle}>Peso total: {materialSold} Toneladas</p>
          </div>
        </div>
      </div>
    </div>
      <div className='flex justify-between w-full'>
        <Button
          text='Atras'
          className={buttonStyle}
          onClick={onClickBack}
        />
        <Button
          text='Reporte'
          className={buttonStyle}
          onClick={() => onClickReport(materialId)}
        />
      </div>
    </section>
  )
}

MaterialsInfoCard.propTypes = {
  materialExtracted: PropTypes.number.isRequired,
  materialSold: PropTypes.number.isRequired,
  materialAvailableForSaleWeight: PropTypes.number.isRequired,
  materialAvailableForSalePrice: PropTypes.number.isRequired,
  materialName: PropTypes.string.isRequired,
  materialImage: PropTypes.string.isRequired,
  materialId: PropTypes.number.isRequired
}

export default MaterialsInfoCard
