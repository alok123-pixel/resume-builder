import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Home/Navbar'
import {useSelector} from 'react-redux'
import Login from './Login'

const Layout = () => {

  const {user} = useSelector(state => state.auth)

  if(!user){
     return <Login />
  }

  return (
    <div>
      <div className='min-h-screen bg-gray-50'>
        <Navbar/>
        <Outlet/>
      </div>
    </div>
  )
}

export default Layout
