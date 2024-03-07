import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Header from '/src/components/Header/Header.jsx'
import RecPage from './Pages/RecPage'
import Watchlist from './Pages/Watchlist'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<RecPage />} />
          <Route path="saved" element={<Watchlist />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )

}

export default App
