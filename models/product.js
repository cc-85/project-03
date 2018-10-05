const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [ true, 'This field is required'],
    minlength: [ 2, 'Name must have at least 2 characters' ]
  },
  size: {
    type: String,
    required: [ true, 'This field is required']
  },
  colour: {
    type: String,
    required: [ true, 'This field is required']
  },
  image: {
    type: String,
    required: [ true, 'This field is required'],
    match: [ /^https?:\/\/.+/, 'Images must start with \'http\'' ]
  },
  price: {
    type: Number,
    required: [ true, 'This field is required']
  },
  description: {
    type: String,
    required: [ true, 'This field is required'],
    minlength: [ 20, 'Description must have at least 20 characters' ]
  },
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

//create the model
module.exports = mongoose.model('Product', productSchema);
