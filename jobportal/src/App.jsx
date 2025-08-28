import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import About from "./components/About";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Navbar />}></Route>
          <Route path='/About' element={<About/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
