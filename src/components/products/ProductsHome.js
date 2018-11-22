import React from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

import ProductCard from './ProductCard';


class ProductsHome extends React.Component {
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
      <div>
        <div className="hero is-small is-light is-bold">
          <div className="hero-body columns">
            {/* ------------------  title and subtitle -------------------- */}
            <div className="column is-half hero-title">
              <img src="/assets/images/treasured-logo.png" alt="Treasured"/>
              <br />
              <h2 className="subtitle">Unclog your wardrobe and make some cash by selling your unwanted clothes and accessories!</h2>
            </div>

            {/* ------------------ hero image --------------------- */}
            <div className="column is-half">
              <div className="hero-img"></div>
            </div>
          </div>
        </div>
        <main className="section">

          <div className="container">

            {/* ------------------ Index appears here ----------------------------- */}
            <ul className="columns is-multiline products-index masonry">
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

          </div>
        </main>
      </div>
    );
  }
}

export default ProductsHome;
