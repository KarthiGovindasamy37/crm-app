import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faUser } from '@fortawesome/free-solid-svg-icons'

function Navbar() {

  let navigate=useNavigate()

  let logout = ()=>{
    localStorage.clear();
    navigate("/")
  }
  return (
    <div className='m-0 p-0'>
    <nav class="navbar navbar-expand-lg navbar-light bg-primary container-fluid">
    <div class="container-fluid">
      <Link to="/app/page"class="navbar-brand text-white fw-bold ms-3" href="#">EPIC CRM</Link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
        <div class="navbar-nav ">
          <Link to="/app/users" class="nav-link active me-5 text-white" aria-current="page" href="#">Users</Link>
          <Link to="/app/leads" class="nav-link me-5 text-white" href="#">Leads</Link>
          <Link to="/app/requests" class="nav-link me-5 text-white" href="#">Service requests</Link>
          <span onClick={logout} class="nav-link me-3 text-white"><FontAwesomeIcon icon={faUser} size="xl"/></span>

        </div>
      </div>
    </div>
    
  </nav>
  
  </div>
  )
}

export default Navbar