import React from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';
//add import auth & comments form later

class ProductsShow extends React.Component {
  constructor() {
    super();
    this.state = { product: null };
  }

  componentDidMount() {
    axios.get(`/api/products/${this.props.match.params.id}`)
      .then(res => this.setState({ product: res.data }));
  }

  render() {
    if(!this.state.product) return null;
    return (
      <section className="section">
        <div className="container">
          <div className="level">
            <h1 className="title"> { this.state.product.name }</h1>
            {/* add authenticated function later*/}
            <div>
              <Link className="button"
                to={`/products/${this.state.product._id}/edit`}> Edit </Link>
              {/* add delete button later */}
            </div>
          </div>
        </div>

        <hr />

        <div className="columns">
          <div className="column is-half">
            <p> { this.state.product.price }</p>
            <p> { this.state.product.size }</p>
            <p> { this.state.product.colour }</p>
            <p> { this.state.product.description }</p>

            {/* add hashtags later */}
          </div>

          <div className="column is-half">
            <img src={ this.state.product.image} alt={this.state.product.name}/>

          </div>
        </div>

      </section>
    );
  }

}

export default ProductsShow;
