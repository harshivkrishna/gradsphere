import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import EditProfile from './Components/EditProfile/Editprofile'
import Profile from './Components/Profile/Profile'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/profile' element={<Profile></Profile>}></Route>
        <Route path='/editprofile' element={<EditProfile></EditProfile>}></Route>
      </Routes>
    </div>
  )
}

export default App