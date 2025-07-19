import React from 'react'
import Navbar from './Component/Navbar'
import { Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import ProductPage from './Pages/ProductPage'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/product/:id' element={<ProductPage />} />

      </Routes>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div>
  )
}

export default App