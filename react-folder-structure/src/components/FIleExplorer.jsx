import React, { useState } from 'react'

const FIleExplorer = ({folderData}) => {
  const [showChild, setShowChild]= useState(false);
    console.log("data :", folderData )
    const handleClick=()=>{
      setShowChild(!showChild)
    }
  return (
    <div className='container'>
        <h5>{folderData.type === "folder"? (showChild?"📂":"📁"):"📂"}
        <span onClick={handleClick}> {folderData.name}</span>
        </h5>
        {
          showChild&& folderData?.children?.map((childata,index)=>{
            return <FIleExplorer folderData={childata}/>
        })
        }
    </div>
  )
}

export default FIleExplorer