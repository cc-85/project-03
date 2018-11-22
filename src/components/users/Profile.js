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
      .then(res => this.setState({ user: res.data }, () => console.log(this.state.user.messages)));

  }

  handleMessageDelete(message) {
    const token = Auth.getToken();
    axios
      .delete(`/api/messages/${message._id}`, {
        headers: { Authorization: `Bearer ${token}`}
      })
      .then(() => {
        const messages = this.state.user.messages.slice();
        const index = messages.indexOf(message);
        messages.splice(index, 1);
        // OR... (less elegant!)
        // const { messages } = this.state.user;
        // messages.splice(index, 1);
        const user = { ...this.state.user, messages };
        this.setState({ user });
      });
  }



  render() {
    if(!this.state.user) return null;
    return(
      <main className="section">
        <div className="container">
          <section className="section">
            <h1 className="title is-2">Your Profile</h1>
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


                  <ul className="columns is-multiline masonry-profile">
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

                  <hr />

                  <h4 className="title is-4">Your messages</h4>
                  <div>
                    {this.state.user.messages.map(message =>
                      <div key={message._id} className="box">
                        <article className="media">
                          <div className="media-left">
                            <figure className="image is-64x64 sender-image">
                              <img src={message.sender.image} alt="Image" />
                            </figure>
                          </div>
                          <div className="media-content">
                            <div className="content">
                              <div className="columns">
                                <div className="column is-11">
                                  <p><strong>{ message.sender.username } - { message.subject }</strong></p>
                                  <p>{ message.content }</p>
                                </div>
                                <div className="column">
                                  <button className="delete is-danger"
                                    onClick={() => this.handleMessageDelete(message)}>
                                  </button>
                                </div>

                              </div>

                            </div>

                          </div>
                        </article>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>


    );
  }
}

export default Profile;
