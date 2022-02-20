import React, { useEffect, useState } from 'react'
import { AlertConstants } from './alert.constants'
import './alert.style.css'

type Props = {
  type: string,
  message: string
  open: boolean
}

const Alert = ({ type, open, message }: Props) => {
  const [closeAlert, setCloseAlert] = useState<AlertConstants>(AlertConstants.Close)

  setTimeout(() => {
    setCloseAlert(AlertConstants.Close)
  }, 5000);

  const onCloseAlert = () => {
    setCloseAlert(AlertConstants.Close)
  }

  useEffect(() => {
    open ? setCloseAlert(AlertConstants.Open) : setCloseAlert(AlertConstants.Close)
  }, [open])

  switch (type) {
    case AlertConstants.Danger:
      return (
        <div className={`${AlertConstants.Danger} ${closeAlert}`}>
          <span className="closebtn" onClick={onCloseAlert}>&times;</span>
          <strong>Danger!</strong> {message}
        </div>)

    default:
      return (<div className={`${AlertConstants.Success} ${closeAlert}`}>
        <span className="closebtn" onClick={onCloseAlert}>&times;</span>
        <strong>Success!</strong> {message}
      </div>)
  }
}

export default Alert