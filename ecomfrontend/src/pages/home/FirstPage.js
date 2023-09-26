import React from 'react'
import { Link } from 'react-router-dom';
import "./FirstPage.css"

const FirstPage = () => {
  return (
    <div className='Home'>
    <Link to="/loginadmin" className='link'>
    <div className="adminSelect">
     <h1>ADMIN</h1>
    </div>
    </Link>
    <Link to="/loginuser" className='link'>
    <div className="studentSelect">
      <h1>User</h1>
    </div>
    </Link>
  </div>
  )
}

export default FirstPage;
