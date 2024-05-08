import PropTypes from 'prop-types'
import Loading from '../common/Loading'
import Button from '../common/Button'

function ReportLayout ({
  children,
  header,
  popup,
  title,
  isLoading,
  buttonName
}) {
  const buttonStyle =
    'text-2xl bg-[#223343] text-white w-1/6 text-center p-3 px-5 rounded-xl'
  return (
    <section className='grid w-full'>
      {popup}
      <div className='m-10 border-2 border-black p-5'>
        <h1 className='text-3xl font-bold ml-10 p-3 mb-5'>{title}</h1>
        <hr className='border border-gray-700 px-4' />
        {header}
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
          {children}
        </section>
            )}
      </div>
      <div className='flex justify-center'>
        <Button
          text={buttonName}
          className={buttonStyle}
        />
      </div>
    </section>
  )
}

ReportLayout.propTypes = {
  children: PropTypes.node,
  header: PropTypes.node,
  popup: PropTypes.node,
  title: PropTypes.string,
  isLoading: PropTypes.bool,
  buttonName: PropTypes.string
}

export default ReportLayout
