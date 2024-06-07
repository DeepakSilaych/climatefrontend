import React from 'react'
import { Link } from 'react-router-dom'

function Mobile() {
  return (
    <div className='w-screen h-screen fixed left-0 top-0 bg-wheat flex flex-col justify-center items-center'>
        <p>Work under progress...</p>
        <p> This portal is not available on mobile right now. Please visit on a desktop.</p> 
        <h1>You know what you can check on mobile ?? <br/> My <a className='underline text-blue-900 italic' href="https://www.linkedin.com/in/deepaksilaych/">Linkedin</a></h1>
    </div>
  )
}

export default Mobile