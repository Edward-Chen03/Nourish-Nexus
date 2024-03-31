import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import DummyPage1 from "./pages/DummyPage1"
import PersonalInfoPage from './pages/PersonalInfoPage/PersonalInfoPage';
import Ingredients from './pages/IngredientsPage/IngredientsPage';
import Recipes from './pages/RecipesPage/RecipesPage'
import Login from "./pages/LoginPage/LoginPage"

function App() {

  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');

  return (

    <Router>
      <Routes>
      <Route path = "/" element = {<Login setUserEmail={setUserEmail} setUserName = {setUserName} />} />
      <Route path = "/home" element = {<HomePage />} />
      <Route path = "/DummyPage1" element = {<DummyPage1 />} />
      <Route path = "/PersonalInformation" element = {<PersonalInfoPage/>} />
      <Route path = "/Ingredients" element = {<Ingredients/>} />
      <Route path = "/Recipes" element = {<Recipes/>} />

      </Routes>
    </Router>
    
  )
}

export default App
