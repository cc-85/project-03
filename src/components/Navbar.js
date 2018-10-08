import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../lib/Auth';


class Navbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = { navbarActive: false };
    this.logout = this.logout.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);
  }

  componentDidUpdate(prevProps) {
    if(prevProps.location.pathname !== this.props.location.pathname) this.setState({ navbarActive: false });
  }

  logout() {
    Auth.logout();
    this.props.history.push('/');
  }

  toggleNavbar() {
    this.setState({ navbarActive: !this.state.navbarActive });
  }

  render() {
    return (
      <nav className="navbar is-fixed-top" role="navigation">
        <div className="container">
          <div className="navbar-brand">
            <Link className="navbar-item logo" to="/">
              <h1 className="treasured-title">Treasured</h1>
              <img src="../assets/images/treasured-logo.png" alt="Treasured" />
            </Link>

            <a role="button"
              className={`navbar-burger ${this.state.navbarActive ? 'is-active' : ''}`}
              data-target="navbar-menu"
              aria-label="menu"
              aria-expanded={this.state.navbarActive ? 'true' : 'false'}
              onClick={this.toggleNavbar}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>


          <div className={`navbar-menu ${this.state.navbarActive ? 'is-active' : ''}`}>
            <div className="navbar-end">
              <Link className="navbar-item" to="/products"> Scroll the items</Link>
              {Auth.isAuthenticated() && <Link href="#" className="navbar-item" to="/products/new">Add an item</Link>}
              {Auth.isAuthenticated() && <a className="navbar-item" onClick={this.logout}>Logout</a>}
              {Auth.isAuthenticated() && <Link href="#" className="navbar-item" to="/profile">Profile</Link>}
              {!Auth.isAuthenticated() && <Link href="#" className="navbar-item" to="/login"> Login </Link>}
              {!Auth.isAuthenticated() && <Link href="#" className="navbar-item" to="/register"> Register</Link>}


            </div>
          </div>
        </div>

      </nav>
    );
  }
}

export default withRouter(Navbar);
