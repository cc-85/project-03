import React from 'react';
import axios from 'axios';

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
      .then(res => this.setState({ user: res.data }, () => console.log(this.state)));
  }

  render() {
    if(!this.state.user) return null;
    return(
      <section className="section">
        <div className="container">
          <p>Username: { this.state.user.username }</p>
          <p>Email: { this.state.user.email }</p>
          {this.state.user.products.map(product => <p key={product._id}>{product.name}</p>)}
          <img src={ this.state.user.image } />
        </div>
      </section>

    );
  }
}

export default Profile;
