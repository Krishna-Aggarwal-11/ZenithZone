import React from 'react'
import { BrowserRouter , Routes, Route } from 'react-router-dom'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard';


const App = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signin' element={<Login/>}/>
        <Route path='/signup' element={<Register/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App