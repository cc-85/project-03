import React from 'react';

const ProductsForm = ({ handleSubmit, handleChange, product, errors }) => {
  return (
    <form onSubmit={handleSubmit}>
      {/* ----------- NAME box ---------- */}
      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input
            className={`input ${errors.name ? 'is-danger' : ''}`}
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={product.name || ''}
          />
          {errors.name && <small className="help is-danger">{errors.name}</small>}
        </div>
      </div>

      {/* -------------- Size box ---------- */}
      <div className="field">
        <label className="label">Size</label>
        <div className="control">
          <input
            className={`input ${errors.size} ? 'is-danger : ''`}
            name="size"
            placeholder="Size"
            onChange={handleChange}
            value={product.size || ''}
          />
          {errors.size && <small className="help is-danger">{errors.size}</small>}
        </div>
      </div>

      {/* ------------------- Color box --------------- */}
      <div className="field">
        <label className="label">Colour</label>
        <div className="control">
          <input
            className={`input ${errors.colour} ? 'is-danger : ''`}
            name="colour"
            placeholder="Colour"
            onChange={handleChange}
            value={product.colour || ''}
          />
        </div>
      </div>

      {/* ---------------- Image upload ------------------- */}
      <div className="field">
        <label className="label">Image</label>
        <div className="control">
          <input
            className={`input ${errors.image ? 'is-danger' : ''}`}
            name="image"
            placeholder="Image URL"
            onChange={handleChange}
            value={product.image || ''}
          />
          {errors.image && <small className="help is-danger">{errors.image}</small>}
        </div>
      </div>

      {/* ------------------ Price box ----------------------- */}
      <div className="field">
        <label className="label">Price</label>
        <div className="control">
          <input
            className={`input ${errors.price ? 'is-danger' : ''}`}
            name="price"
            placeholder="Price"
            onChange={handleChange}
            value={product.price || ''}
          />
          {errors.price && <small className="help is-danger">{errors.price}</small>}
        </div>
      </div>

      {/* ------------------ Description box ----------------------- */}
      <div className="field">
        <label className="label">Item Description</label>
        <div className="control">
          <input
            className={`input ${errors.description ? 'is-danger' : ''}`}
            name="description"
            placeholder="Description"
            onChange={handleChange}
            value={product.description || ''}
          />
          {errors.description && <small className="help is-danger">{errors.description}</small>}
        </div>
      </div>

      <button className="button is-primary">Submit</button>
    </form>
  );
};

export default ProductsForm;
