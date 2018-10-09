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
      <main>
        <section className="hero is-small is-light is-bold">
          <div className="hero-body columns">
            {/* ------------------  title and subtitle -------------------- */}
            <div className="column is-half hero-title">
              <h1 className="title is-2">
                Treasured
              </h1>
              <br />

              <h2 className="subtitle">
                Unclog your wrdrobe and Sell your favorite stuff on our 100% secure platform!
              </h2>
            </div>

            {/* ------------------ hero image --------------------- */}
            <div className="column is-half">
              <img className="hero-img" src="/assets/images/hangers.jpg" alt="shopping" />
            </div>
          </div>
        </section>

        {/* ------------------ Index appears here ----------------------------- */}
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

export default ProductsHome;
