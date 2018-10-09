import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../lib/Auth';
import axios from 'axios';


class Navbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = { navbarActive: false, user: null };
    this.logout = this.logout.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);
  }

  getCurrentUser() {
    const token = Auth.getToken();
    axios.get(`/api/users/${Auth.getPayload().sub}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
      .then(res => this.setState({ user: res.data }));
  }

  componentDidMount() {
    if(Auth.isAuthenticated()) this.getCurrentUser();
  }


  componentDidUpdate(prevProps) {
    // close navbar if we change "page"
    if(prevProps.location.pathname !== this.props.location.pathname) this.setState({ navbarActive: false });

    // if the user is NOT logged in, but there IS a user being displayed, remmove that user from state
    if(!Auth.isAuthenticated() && this.state.user) this.setState({ user: null });
    // if the user IS logged in, but NOT being displayed, get the user and set it to state
    if(Auth.isAuthenticated() && !this.state.user) this.getCurrentUser();
  }

  logout() {
    Auth.logout();
    this.props.history.push('/');
    //this.setState({ user: {} });
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
              <Link className="navbar-item" to="/products"> View all items</Link>
              {Auth.isAuthenticated() && <Link href="#" className="navbar-item" to="/products/new">Add an item</Link>}
              {Auth.isAuthenticated() && <a className="navbar-item" onClick={this.logout}>Logout</a>}
              {Auth.isAuthenticated() && this.state.user && <Link href="#" className="navbar-item nav-icon" to="/profile">
                <strong>{this.state.user.username}</strong>
                <img src={this.state.user.image} />
              </Link>}
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
