import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Stepper from './components/Stepper'

function App() {
  const steps=[
    {
      label: "Personal Info",
      content: <div>Personal Information Content</div>
    },
    {
      label: "Account Info",
      content: <div>Account info content</div>
    },
    {
      label: "Paywmt Info",
      content: <div>Payment info content</div>
    },
    {
      label: "Confirmation Info",
      content: <div>Confirmation info content</div>
    },
    {
      label: "Review ",
      content: <div>Review content</div>
    }
  ]
  

  return (
    <>
      <Stepper steps={steps}/>
    </>
  )
}

export default App
