import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Header from '/src/components/Header/Header.jsx'
import RecPage from './Pages/RecPage'
import Saved from './Pages/Saved'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<RecPage />} />
          <Route path="saved" element={<Saved />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )

}

export default App
