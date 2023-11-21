import React from 'react'
import { Routes,Route } from 'react-router-dom';
import './App.css';
import Admin from './components/Admin';
import Login from './components/Login';
import User from './components/User';
const App = () => {
  return (
    <div> 
     <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/userlist' element={<User/>}></Route>
      <Route path='/adminlist' element={<Admin/>}></Route>
     </Routes>
    </div>
  );
}

export default App
