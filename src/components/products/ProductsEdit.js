import React from 'react';
import axios from 'axios';
import ProductsForm from './ProductsForm';
import Auth from '../../lib/Auth';

class ProductsEdit extends React.Component {
  constructor() {
    super();
    this.state = { product: null, errors: {} };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/products/${this.props.match.params.id}`)
      .then(res => this.setState({ product: res.data}));
  }

  handleChange(e) {
    const product = { ...this.state.product, [e.target.name]: e.target.value };
    this.setState({ product });
  }

  handleSubmit(e) {
    e.preventDefault();
    const token = Auth.getToken();
    axios
      .put(`/api/products/${this.props.match.params.id}`, this.state.product, {
        headers: { Authorization: `Bearer ${token}`}
      })
      .then(() => this.props.history.push(`/products/${this.props.match.params.id}`))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  render() {

    if(!this.state.product) return null;

    return (
      <ProductsForm
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        product={this.state.product}
        errors={this.state.errors}
      />
    );
  }
}

export default ProductsEdit;
