const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  subject: { type: String },
  content: { type: String },
  sender: { type: mongoose.Schema.ObjectId, ref: 'User' },
  receiver: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Message', messageSchema);
