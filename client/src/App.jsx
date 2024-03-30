import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DummyPage1 from "./pages/DummyPage1"
import PersonalInfoPage from './pages/PersonalInfoPage/PersonalInfoPage';
import Ingredients from './pages/IngredientsPage/IngredientsPage';
import Recipes from './pages/RecipesPage/RecipesPage'

function App() {

  return (

    <Router>
      <Routes>

      <Route path = "/" element = {<HomePage />} />
      <Route path = "/DummyPage1" element = {<DummyPage1 />} />
      <Route path = "/PersonalInformation" element = {<PersonalInfoPage/>} />
      <Route path = "/Ingredients" element = {<Ingredients/>} />
      <Route path = "/Recipes" element = {<Recipes/>} />

      </Routes>
    </Router>
    
  )
}

export default App
