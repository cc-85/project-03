const mongoose = require('mongoose');

//create a model for message
const messageSchema = new mongoose.Schema({
  subject: { type: String },
  content: { type: String },
  sender: { type: mongoose.Schema.ObjectId, ref: 'User' }, //picks the sender's ID
  receiver: { type: mongoose.Schema.ObjectId, ref: 'User' } //picks the ID of the product's owner which is the receiver
});

module.exports = mongoose.model('Message', messageSchema);
