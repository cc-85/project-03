import React from 'react';
import axios from 'axios';
import ProductsForm from './ProductsForm';
import Auth from '../../lib/Auth';

class ProductsNew extends React.Component {
  constructor() {
    super();
    this.state = {product: {}, errors: {} };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const product = { ...this.state.product, [e.target.name]: e.target.value };
    const errors = { ...this.state.errors, [e.target.name]: ''};
    this.setState({ product, errors });
  }

  handleSubmit(e) {
    e.preventDefault();
    const token = Auth.getToken();
    axios
      .post('/api/products', this.state.product, {
        headers: {Authorization: `Bearer ${token}`}
      })
      .then(() => this.props.history.push('/products'))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  render() {
    return (
      <div>
        <h1 className="product-form title is-2"> Add an item </h1>
        <ProductsForm
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          product={this.state.product}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

export default ProductsNew;
