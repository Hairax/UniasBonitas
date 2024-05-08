import Button from '../common/Button'
import Loading from '../common/Loading'
import { getExtractionRegister } from '../../utils/Connections'
import { useEffect, useState } from 'react'
import PopupExtractedMaterial from './PopupExtractedMaterial'

function ExtractedReportLayout () {
  const [isLoading, setIsLoading] = useState(true)
  const [materials, setMaterials] = useState({})
  const [display, setDisplay] = useState(false)
  const getExtractedMaterials = async () => {
    const data = await getExtractionRegister()
    setMaterials(data)
    setIsLoading(false)
  }
  useEffect(() => async () => {
    const fetchData = async () => {
      await getExtractedMaterials()
    }
    const interval = setInterval(fetchData, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className='grid w-full'>
      <PopupExtractedMaterial
        title={'Añadir Material Extraido'}
        displayState={display}
        setDisplayState={setDisplay}
      />
      <div className='m-10 border-2 border-black p-5'>
        <h1
          className='text-3xl font-bold ml-10 p-3 mb-5'>
          Materiales Extraidos
        </h1>
        <hr className='border border-gray-700 px-4' />
        <div className='grid grid-cols-4 gap-5 m-10'>
          <div>
            <h2 className='text-2xl font-bold'>Fecha</h2>
          </div>
          <div>
            <h2 className='text-2xl font-bold'>Peso/Toneladas</h2>
          </div>
          <div>
            <h2 className='text-2xl font-bold'>Material</h2>
          </div>
        </div>
        <hr className='border border-gray-700 px-4' />
        {isLoading
          ? (
          <div className='flex min-h-96 justify-center text-xl w-full items-center'>
              <h2 className='text-2xl mr-3'>Loading</h2>
              <Loading className='w-10'/>
          </div>
            )
          : (
        <section className='max-h-96 overflow-scroll'>
          {materials.map((material, i) => (
            <div key={i} className='grid grid-cols-4 gap-5 m-10'>
              <div>
                <p className='text-2xl'>{material.date}</p>
              </div>
              <div>
                <p className='text-2xl'>{material.weight} T</p>
              </div>
              <div>
                <p className='text-2xl'>{material.name}</p>
              </div>
              <div className='flex justify-center'>
                <Button text='Edit' className='bg-gray-300 rounded-xl w-2/4'/>
              </div>
            </div>
          ))
          }
        </section>
            )}
      </div>
      <div className='flex justify-center'>
        <Button
          text='Añadir Venta'
          onClick={() => setDisplay(true)}
          className='text-2xl bg-[#223343] text-white w-1/6 text-center p-3 px-5 rounded-xl'
        />
      </div>
    </section>
  )
}

export default ExtractedReportLayout
