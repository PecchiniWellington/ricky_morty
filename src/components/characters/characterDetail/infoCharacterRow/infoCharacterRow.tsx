import React from 'react'
import './infoCharacterRow.style.css'
type Props = {
  infoKey?: string;
  info?: string
}

const InfoCharacterRow = ({infoKey, info}: Props) => {
  const cap = infoKey && infoKey[0].toUpperCase() + infoKey.substring(1)
  return (
    <div className='infoCharacterRow_container'>
      <label className='infoCharacterRow_content'>{cap}: </label>
      <div>{info}</div>
    </div>
  )
}

export default InfoCharacterRow