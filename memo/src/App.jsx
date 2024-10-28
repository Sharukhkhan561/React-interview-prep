import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CustomUseMemo from './components/CustomUseMemo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <CustomUseMemo/>
    </>
  )
}

export default App
