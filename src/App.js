import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './pages/home'
import TrainFlood from './pages/trainflood'
import Past from './pages/past'
import Header from './components/Header'
import WhoWeAre from './pages/whoweare'
import BlogPage from './pages/BlogPage'


function App() {
  return (
    <>
    <BrowserRouter>
    <Header /> 
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/train' element={<TrainFlood />} />
      <Route path='/about' element={<WhoWeAre />} />
      <Route path='/past' element={<Past />} />
      <Route path='/blog' element={<BlogPage />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
