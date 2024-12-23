const mongoose = require('mongoose');

const ManagerRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  questions: { type: String, required: true },
  details: { type: String, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  adminMessage: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ManagerRequest', ManagerRequestSchema);