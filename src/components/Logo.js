import React from 'react'
import logo from '../images.png'

function Logo({width="50px"}) {
  return (
    <div>
      <img src= {logo} alt="Powered by Appwrite" width={width} style={{borderRadius:"50%", filter: "invert(1)"}} />
    </div>
  )
}

export default Logo