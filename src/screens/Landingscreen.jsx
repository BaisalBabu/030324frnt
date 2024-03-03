import React from 'react';
import { Link } from 'react-router-dom';

function Landingscreen() {
  // Check if there's a user in localStorage
  const user = JSON.parse(localStorage.getItem('currentuser'));

  // If there's a user, don't render the Landingscreen
  if (!user) {
    // You can return null or any other component
   window.location.href="/login"
  }

  // If there's no user, render the Landingscreen
  return (
    <div className='row landing justify-content-center'>
      <div className="col-md-10 my-auto text-center bar">
        <h2 style={{color:'white',fontSize:'150px'}}>Emirates</h2>
        <h1 style={{color:'white'}}>"There is Only one Boss. The Guest"</h1>
        <Link to='/home'>
          <button className='btn btn-primary landing-btn'>Get Started</button>
        </Link>
      </div>
    </div>
  );
}

export default Landingscreen;
