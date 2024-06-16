import React from 'react'

function Spinner({height, variant}) {
  return (
    <span className={`spinner ${variant}`} style={{width: height, height}}></span>
  )
}

export default Spinner