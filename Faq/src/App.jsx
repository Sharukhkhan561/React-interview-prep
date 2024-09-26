import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import data from "./data/faqData.json"
import Faq from './components/Faq'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Faq data={data}/>
    </>
  )
}

export default App
