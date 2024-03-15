import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import SearchPage from './Pages/SearchPage'
import Parameters from './Pages/Parameters'
import Recommendation from './Pages/Recommendation'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<SearchPage />} />
          <Route path="parameters" element={<Parameters />} />
          <Route path="recommendation" element={<Recommendation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )

}

export default App
