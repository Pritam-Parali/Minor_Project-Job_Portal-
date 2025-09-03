import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import About from "./components/About";
import Job from "./components/Job";
import Apply from "./components/Apply";
import Contactus from './components/Contactus'
import Myprofile from './components/Myprofile';
import Login from './components/Login';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Navbar />}></Route>
          <Route path='/About' element={<About/>}></Route>
          <Route path='/Job' element={<Job/>}></Route>
          <Route path="/apply/:jobId" element={<Apply />} />
          <Route path='/Contactus' element={<Contactus/>}></Route>
          <Route path='/Myprofile' element={<Myprofile/>}></Route>
          <Route path='/Login' element={<Login/>}></Route>
        </Routes>
      </Router>
      
    </>
  )
}

export default App
