import React from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

import ProductCard from '../products/ProductCard';

import Auth from '../../lib/Auth';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = { user: null };

  }

  componentDidMount() {
    const token = Auth.getToken();
    axios.get(`/api/users/${Auth.getPayload().sub}`, {
      headers: {Authorization: `Bearer ${token}`}
    })
      .then(res => this.setState({ user: res.data }, () => console.log(this.state.user.username)));
  }

  render() {
    if(!this.state.user) return null;
    return(
      <section className="section">
        <h1 className="title is-1">Your Profile</h1>
        <div className="container">
          <div className="columns">
            <div className="column is-one-quarter">
              <div className="card account-details">
                <div className="card-image">
                  <figure className="image">
                    <img src={ this.state.user.image }/>
                  </figure>
                </div>
                <div className="card-content">
                  <h5 className="title is-5">{ this.state.user.username }</h5>
                  <hr />
                  <p>{ this.state.user.email }</p>
                  <hr />
                  {Auth.isAuthenticated() && Auth.getPayload().sub === this.state.user._id &&
                  <div>
                    <Link className="button"
                      to={`/profile/${this.state.user._id}/edit`}>Edit</Link>
                  </div>}
                </div>
              </div>
            </div>
            <hr />
            <div className="column is-three-quarters">
              <h4 className="title is-4">Items you are selling</h4>
              {/* {this.state.user.products.map(product => <p key={product._id}>{product.name}</p>)} */}


              <ul className="columns is-multiline">
                {this.state.user.products.map(product =>
                  <li
                    className="column is-one-quarter-desktop is-one-third-tablet" key={product._id}
                  >
                    <Link to={`/products/${product._id}`}>
                      <ProductCard {...product} />
                    </Link>
                  </li>
                )}
              </ul>






            </div>
          </div>
        </div>
      </section>

    );
  }
}

export default Profile;
