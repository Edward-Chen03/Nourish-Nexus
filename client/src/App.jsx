import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../src/pages/HomePage/HomePage';
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
      <Route path = "/PersonalInformation" element = {<PersonalInfoPage/>} />
      <Route path = "/Ingredients" element = {<Ingredients/>} />
      <Route path = "/Recipes" element = {<Recipes/>} />
      <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Router>
    
  )
}

export default App
