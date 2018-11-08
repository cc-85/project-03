import React from 'react';

const ProductCard = ( {name, size, image, price} ) => {
  // shows one product
  return (
    <div className="card">
      <header className="card-header">
        <h2 className="card-header-title">{name}</h2>
      </header>

      <div className="card-image">
        <figure className="image">
          <img src={image} alt={name} />
        </figure>
      </div>

      <div className="card-content">
        <p><strong> £{price} </strong></p>
        <p> size: {size} </p>
      </div>
    </div>
  );
};

export default ProductCard;
