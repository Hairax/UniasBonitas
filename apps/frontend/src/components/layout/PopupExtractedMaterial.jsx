import PropTypes from 'prop-types'
import InputField from '../common/InputField'
import Button from '../common/Button'
import { useState } from 'react'
import { postExtractionRegister } from '../../utils/Connections'

function PopupExtractedMaterial ({
  extractedMaterialName,
  extractedMaterialAmount,
  extractedMaterialDate,
  title,
  className,
  displayState,
  setDisplayState
}) {
  const [extractedMaterialNameNew, setExtractedMaterialName] = useState('')
  const [extractedMaterialAmountNew, setExtractedMaterialAmount] = useState('')
  const [extractedMaterialDateNew, setExtractedMaterialDate] = useState('')

  const cancel = () => {
    setExtractedMaterialName('')
    setExtractedMaterialAmount('')
    setExtractedMaterialDate('')
    extractedMaterialName = ''
    extractedMaterialAmount = ''
    extractedMaterialDate = ''
  }
  const onClickCancel = () => {
    cancel()
    setDisplayState(false)
    console.log(displayState)
  }
  const onClickSave = async () => {
    cancel()
    const valid = await checkValid()
    if (!valid) {
      alert('Por favor llene todos los campos')
      return
    }
    setDisplayState(false)
    await postExtractionRegister({
      name: extractedMaterialNameNew,
      weight: extractedMaterialAmountNew,
      date: extractedMaterialDateNew
    })
  }
  const checkValid = async () => {
    setExtractedMaterialName(extractedMaterialNameNew.trim())
    setExtractedMaterialAmount(extractedMaterialAmountNew.trim())
    setExtractedMaterialDate(extractedMaterialDateNew.trim())
    const invalidMaterialName = extractedMaterialNameNew === ''
    const invalidMaterialAmount = extractedMaterialAmountNew === ''
    const invalidMaterialDate = extractedMaterialDateNew === ''
    if (invalidMaterialName || invalidMaterialAmount || invalidMaterialDate) {
      return false
    }
    return true
  }
  const inputFieldStyles =
    'rounded-md border-2 p-2 w-full text-xl border-[#c9c9c9]'
  const labelStyles =
    'text-md text-[#666]'
  const buttonStyles =
    'bg-[#3E3E3E] text-white rounded-full w-full text-xl p-2'
  if (displayState) {
    return (
      <section
        className={`absolute flex z-10 w-screen h-5/6 justify-center place-items-center backdrop-blur-sm ${className}`}
      >
        <div
          className='border border-black w-1/2 bg-[#f0f0f0] rounded-xl p-5'
        >
          <h1 className='text-3xl font-bold text-center'>{title}</h1>
          <div>
            <label className={labelStyles}>Material </label>
            <InputField
              type={'text'}
              value={extractedMaterialName}
              onChange={(value) => setExtractedMaterialName(value)}
              className={inputFieldStyles}
            />
          </div>
          <div>
            <label className={labelStyles}>Cantidad </label>
            <InputField
              type={'text'}
              value={extractedMaterialAmount}
              onChange={(value) => setExtractedMaterialAmount(value)}
              className={inputFieldStyles}
            />
          </div>
          <div>
            <label className={labelStyles}>Fecha </label>
            <InputField
              type={'text'}
              value={extractedMaterialDate}
              onChange={(value) => setExtractedMaterialDate(value)}
              className={inputFieldStyles}
            />
          </div>
          <div className='grid grid-cols-2 p-2 gap-10'>
            <Button
              text='Cancelar'
              className={buttonStyles}
              onClick={onClickCancel}
            />
            <Button
              text='Guardar'
              className={buttonStyles}
              onClick={onClickSave}
            />
          </div>

        </div>
      </section>
    )
  } else {
    return <div></div>
  }
}

PopupExtractedMaterial.propTypes = {
  extractedMaterialName: PropTypes.string,
  extractedMaterialAmount: PropTypes.number,
  extractedMaterialDate: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
  displayState: PropTypes.bool,
  setDisplayState: PropTypes.func
}

export default PopupExtractedMaterial
