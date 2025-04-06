import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import LoginForm from './_forms/Login/LoginForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <Navbar />
       <LoginForm />
    </>
  )
}

export default App
