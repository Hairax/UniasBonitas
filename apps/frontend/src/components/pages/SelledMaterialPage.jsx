import Header from '../layout/Header'
import ReportLayout from '../layout/ReportLayout'
import PopupExtractedMaterial from '../layout/PopupExtractedMaterial'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSells } from '../../utils/Connections'

function SelledMaterialPage () {
  const { id } = useParams()
  const [display, setDisplay] = useState()
  const [sells, setSells] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getSellsOfMaterial = async () => {
    setSells(await getSells(id))
    setIsLoading(false)
  }

  useEffect(() => async () => {
    const fetchData = async () => {
      await getSellsOfMaterial()
    }
    const interval = setInterval(fetchData, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <Header />
      <ReportLayout
        title='Venta'
        buttonName={'Añadir Material Vendido'}
        isLoading={isLoading}
        popup={
          <PopupExtractedMaterial
            title={'Añadir Material Vendido'}
            displayState={display}
            setDisplayState={setDisplay}
          />
        }
        header={
          <div className='grid grid-cols-4 text-center m-10'>
            <div>
              <h2 className='text-2xl font-bold'>Fecha</h2>
            </div>
            <div>
              <h2 className='text-2xl font-bold'>Peso/Toneladas</h2>
            </div>
            <div>
              <h2 className='text-2xl font-bold'>Precio</h2>
            </div>
            <div>
              <h2 className='text-2xl font-bold'>Precio/Tonelada</h2>
            </div>
          </div>
        }
      >
          <section>
            {sells.map((sell, i) => (
              <div key={i} className='grid grid-cols-4 text-center m-10'>
                <div>
                  <p className='text-2xl'>{sell.date}</p>
                </div>
                <div>
                  <p className='text-2xl'>{sell.totalPrice}</p>
                </div>
                <div>
                  <p className='text-2xl'>{'12'}</p>
                </div>
                <div>
                  <p className='text-2xl'>{sell.totalPrice}</p>
                </div>
              </div>
            ))
            }
          </section>
      </ReportLayout>
    </div>
  )
}

export default SelledMaterialPage
