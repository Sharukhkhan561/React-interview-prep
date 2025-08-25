import React from 'react'
import '../App.css'

const ProgressBar = ({progress}) => {
  return (
    <div className='outer'>
        <div className='inner'>
            {progress}
        </div>
    </div>
  )
}

export default ProgressBar