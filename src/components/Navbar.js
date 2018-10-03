import React from 'react';
import { Link, withRouter } from 'react-router-dom';


const Navbar = () => {
  //add props above later
//add auth logout function later
  return (
    <nav className="navbar" role="navigation">
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            Project 03
          </Link>

          <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>


        <div className="navbar-menu">
{/* add authenticated conditional statement later*/}
          <div className="navbar-end">
            <Link className="navbar-item" to="/products"> Scroll the items</Link>
            <Link className="navbar-item" to="/login"> Login </Link>
            <Link className="navbar-item" to="/register"> Register</Link>
            <Link className="navbar-item" to="/login"> Logout</Link>

          </div>
        </div>
      </div>

    </nav>
  );
};

export default withRouter(Navbar);
