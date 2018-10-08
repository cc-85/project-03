import React from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';
import MessagesForm from './MessagesForm';


class ProductsShow extends React.Component {
  constructor() {
    super();
    this.state = { product: null, message: {} };
  }

  componentDidMount() {
    axios.get(`/api/products/${this.props.match.params.id}`)
      .then(res => {
        const message = { subject: `RE: ${res.data.name}`, receiver: res.data.user._id};
        this.setState({ product: res.data, message });
      });
  }

  handleMessageChange(e) {
    const message = { ...this.state.message, [e.target.name]: e.target.value};
    this.setState({ message });
  }

  handleMessageSubmit(e) {
    e.preventDefault();
    // const token = Auth.getToken();
    axios
      .post('/messages', this.state.message)
      .then(() => this.setState({ message: {} }));
  }

  handleDelete() {
    const token = Auth.getToken();

    axios
      .delete(`/api/product/${this.props.match.params.id}`, {
        headers: { Authorization: `Bearer ${token}`}
      })
      .then(() => this.props.history.push('/products'));
  }

  render() {
    if(!this.state.product) return null;
    return (
      // ------------ Name of the item -------------
      <section className="section">
        <div className="container">
          <div className="level">
            <h1 className="title"> { this.state.product.name }</h1>
            {Auth.isAuthenticated() && Auth.getPayload().sub === this.state.product.user._id &&
            <div>

              {/* -------------- EDIT button ------------ */}
              <Link className="button"
                to={`/products/${this.state.product._id}/edit`}>Edit</Link>

              {/* ---------------- DELETE button --------------- */}
              <button onClick={this.handleDelete}
                className="button is-danger"
              >Delete</button>
            </div>}
          </div>
        </div>

        <hr />

        {/* -------------- price, size, colour, description infos ------------- */}
        <div className="columns">
          <div className="column is-half">
            <p> <strong>Price: </strong>£{ this.state.product.price }</p>
            <p> <strong>Size: </strong>{ this.state.product.size }</p>
            <p> <strong>Color: </strong>{ this.state.product.colour }</p>
            <p> <strong>Description: </strong>{ this.state.product.description }</p>

            {/* add hashtags later */}

            {/* ----------------------- Messaging form --------------------------- */}

            <hr />

            {Auth.isAuthenticated() && Auth.getPayload().sub !== this.state.product.user._id &&
              <div>
                <h5 className="title is-5"> Send the seller a message </h5>
                <MessagesForm
                  handleMessageSubmit={this.handleMessageSubmit}
                  handleMessageChange={this.handleMessageChange}
                  message={this.state.message}
                />
              </div>}
            {!Auth.isAuthenticated() &&
              <div>
                <h5 className="title is-5"> Send the seller a message </h5>
                <p>Please <Link to="/login"> log in </Link>to contact the seller.</p>
              </div>}

          </div>

          {/* ------------------- Image of the product ------------------------- */}
          <div className="column is-half">
            <img src={ this.state.product.image} alt={this.state.product.name}/>
          </div>
        </div>

      </section>
    );
  }

}

export default ProductsShow;
