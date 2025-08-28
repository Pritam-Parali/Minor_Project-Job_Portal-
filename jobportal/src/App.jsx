import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import About from "./components/About";
import Job from "./components/Job";
import Intership from './components/Internship';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Navbar />}></Route>
          <Route path='/About' element={<About/>}></Route>
          <Route path='/Job' element={<Job/>}></Route>
          <Route path='/Internship' element={<Intership/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
