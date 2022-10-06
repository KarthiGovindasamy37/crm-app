import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

function AppPage() {
  return (
    <div class="container-fluid">
        <Navbar/>
        <Outlet/>
       
    </div>
  )
}

export default AppPage