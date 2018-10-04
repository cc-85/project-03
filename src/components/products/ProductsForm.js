import React from 'react';


// add errors handler later inside the parameters and in the form
const ProductsForm = ({ handleSubmit, handleChange, product, errors}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label"> Name </label>
        <div className="control">
          <input
            className={`input ${errors.image ? 'is-danger' : ''}`}
            name="name"
            placeholder="name"
            onChange={handleChange}
            value={product.name || ''}
          />
        </div>
      </div>

      {/* user uploads image */}
      <div className="field">
        <label className="label"> Image </label>
        <div className="control">
          <input
            className={`input ${errors.image ? 'is-danger' : ''}`}
            name="image"
            placeholder="image"
            onChange={handleChange}
            value={product.image || ''}
          />
          {errors.image && <small className="help is-danger">{errors.image}</small>}

        </div>
      </div>

      <button className="button is-primary"> Submit </button>
    </form>
  );
};

export default ProductsForm;
