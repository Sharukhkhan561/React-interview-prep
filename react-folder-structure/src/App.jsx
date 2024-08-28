import { useState } from 'react'
import './App.css'
import FIleExplorer from './components/FIleExplorer'
import data from "./data.json"

function App() {

  return (
    <>
      <FIleExplorer folderData={data} />
    </>
  )
}

export default App
