import { useCallback, useEffect, useState } from 'react'
import Loading from '../common/Loading'
import MaterialCard from './MaterialCard'
import { getProducts, getImage } from '../../utils/Connections'
import { useNavigate } from 'react-router-dom'

function MaterialGridDisplay () {
  const [loading, setLoading] = useState(true)
  const [materials, setMaterials] = useState([])
  const navigate = useNavigate()
  const getAllProducts = async () => {
    const data = await getProducts()
    setMaterials(data)
    setLoading(false)
  }
  const onClick = useCallback(
    (id) => {
      navigate(`/material-info/${id}`)
    }, [navigate]
  )
  useEffect(() => async () => {
    const fetchData = async () => {
      await getAllProducts()
    }
    const interval = setInterval(fetchData, 1000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className='flex min-h-96 justify-center text-xl w-full items-center'>
        <h2 className='text-2xl mr-3'>Loading</h2>
        <Loading className='w-10'/>
      </div>
    )
  } else {
    return (
      <section className='grid grid-cols-2 grid-rows-2 w-full p-5 justify-items-center gap-6'>
        {materials.map((material, i) => (
          <MaterialCard
            key={i}
            materialName={material.nombre}
            materialImage={getImage(material.nombre)}
            materialPrice={material.precio}
            materialQuantity={material.materialDisponible}
            onClick={() => onClick(material.productoId)}
          />
        ))
        }
      </section>
    )
  }
}

export default MaterialGridDisplay
