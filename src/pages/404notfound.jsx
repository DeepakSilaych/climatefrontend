import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div>
      <p>404: Not Found <br/> 
      Sorry, the page you are looking for does not exist, check the url. <br/>
      Instead can check my <a className=' underline' href="https://www.linkedin.com/in/deepaksilaych/">Linkedin</a></p>
    </div>
  )
}

export default NotFound