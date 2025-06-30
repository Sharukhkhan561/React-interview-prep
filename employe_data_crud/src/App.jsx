import { useState } from 'react'

import './App.css'
import EmployeeData from './components/Employee'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <EmployeeData/>
    </>
  )
}

export default App
