import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DummyPage1 from "./pages/DummyPage1"
import PersonalInfoPage from './pages/PersonalInfoPage/PersonalInfoPage';

function App() {

  return (

    <Router>
      <Routes>

      <Route path = "/" element = {<HomePage />} />
      <Route path = "/DummyPage1" element = {<DummyPage1 />} />
      <Route path = "/PersonalInformation" element = {<PersonalInfoPage/>} />

      </Routes>
    </Router>
    
  )
}

export default App
