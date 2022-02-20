import React from 'react'
import { Link } from 'react-router-dom'
import './notFoundPage.style.css'

const NotFoundPage = () => {
  return (
    <div className='notFoundPage_container'>
      <img src="https://media3.giphy.com/media/hEc4k5pN17GZq/giphy.gif" alt="not found" srcSet="https://media3.giphy.com/media/hEc4k5pN17GZq/giphy.gif" />
      <h1>404 - Not Found!</h1>
      <Link to="/">Go Home</Link>
    </div>
  )
}

export default NotFoundPage