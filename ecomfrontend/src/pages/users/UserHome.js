import React from 'react'
import Logout from '../forms/setting/Logout'
import { Link } from 'react-router-dom'

const UserHome = () => {
  return (
    <>
    <Link to="/logout">Logout</Link>
    <div>
      userhome
    </div>
    </>
    
  )
}

export default UserHome
