import React from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

import ProductCard from './ProductCard';


class ProductsIndex extends React.Component {
  constructor() {
    super();
    this.state = { products: []};
  }

  componentDidMount() {
    axios
      .get('/api/products')
      .then(res => this.setState({ products: res.data}));
  }

  render() {
    return (
      <main>
        <h1 className="title is-2"> View all items </h1>
        <ul className="columns is-multiline products-index">
          {this.state.products.map(product =>
            <li
              className="column is-one-quarter-desktop is-one-third-tablet" key={product._id}
            >
              <Link to={`/products/${product._id}`}>
                <ProductCard {...product} />
              </Link>
            </li>
          )}
        </ul>
      </main>
    );
  }
}

export default ProductsIndex;
