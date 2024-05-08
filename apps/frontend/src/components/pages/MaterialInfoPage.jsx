import Banner from '../common/Banner'
import { useParams } from 'react-router-dom'
import Header from '../layout/Header'
import MaterialBackground from '../../assets/MaterialBackground.jpeg'
import MaterialsInfoCard from '../layout/MaterialsInfoCard'
import { getMaterial, getImage } from '../../utils/Connections'
import { useEffect, useState } from 'react'

function MaterialInfoPage () {
  const { id } = useParams()
  const [materialInfo, setMaterialInfo] = useState({})

  const getMaterialInfo = async (id) => {
    setMaterialInfo(await getMaterial(id))
  }
  useEffect(() => async () => {
    await getMaterialInfo(id)
  }, [id])

  return (
    <div>
      <Header />
      <Banner text='Material' src={MaterialBackground} />
      <section className='flex flex-col items-center justify-center mt-10'>
        <MaterialsInfoCard
          materialExtracted={materialInfo.materialExtraido}
          materialSold={materialInfo.materialVendido}
          materialAvailableForSaleWeight={materialInfo.materialDisponible}
          materialAvailableForSalePrice={materialInfo.precio}
          materialName={materialInfo.nombre}
          materialImage={getImage(materialInfo.nombre)}
          materialId={materialInfo.productoId}
        />
      </section>
    </div>
  )
}

export default MaterialInfoPage
