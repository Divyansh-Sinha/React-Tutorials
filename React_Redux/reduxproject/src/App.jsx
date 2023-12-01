import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import ProductListing from './components/ProductListing'
import ProductDetail from './components/ProductDetail'

const App = () => {
  return (
    <div className='App'>
      <Router>
        <Header/>
        <Routes>
          <Route path='/' exact Component={ProductListing} />
          <Route path='/product/:productId' exact Component={ProductDetail} />
          <Route>404 not found</Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App