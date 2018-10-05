import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../lib/Auth';


const Navbar = props => {
  const logout = () => {
    Auth.logout();
    props.history.push('/');
  };

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
          <div className="navbar-end">
            <Link className="navbar-item" to="/products"> Scroll the items</Link>
            {Auth.isAuthenticated() && <Link className="navbar-item" to="/products/new">Add an item</Link>}
            {Auth.isAuthenticated() && <a className="navbar-item" onClick={logout}>Logout</a>}
            {Auth.isAuthenticated() && <Link className="navbar-item" to="/profile">Profile</Link>}
            {!Auth.isAuthenticated() && <Link className="navbar-item" to="/login"> Login </Link>}
            {!Auth.isAuthenticated() && <Link className="navbar-item" to="/register"> Register</Link>}


          </div>
        </div>
      </div>

    </nav>
  );
};

export default withRouter(Navbar);
