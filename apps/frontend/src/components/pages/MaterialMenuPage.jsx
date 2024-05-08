import Header from '../layout/Header'
import Banner from '../common/Banner'
import MaterialBackground from '../../assets/MaterialBackground.jpeg'
import MaterialGridDisplay from '../layout/MaterialGridDisplay'

function MaterialMenuPage () {
  return (
    <div className='h-screen '>
      <Header />
      <Banner text={'Meteriales'} src={MaterialBackground}/>
      <MaterialGridDisplay />
    </div>
  )
}

export default MaterialMenuPage
