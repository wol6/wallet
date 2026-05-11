import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/login/LoginPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <Home/> */}
    <Routes>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/dept/:id' element={<Home/>}/>
    </Routes>
    </>
  )
}

export default App
