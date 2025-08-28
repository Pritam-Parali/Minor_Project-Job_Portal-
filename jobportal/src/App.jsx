import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Navbar />}></Route>
          <Route path='/Home' element={<Home/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
