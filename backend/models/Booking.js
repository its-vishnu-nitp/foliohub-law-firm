const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  phone: { type: String, required: true, trim: true, maxlength: 30 },
  email: { type: String, required: true, lowercase: true, trim: true, maxlength: 254 },
  service: { type: String, required: true, trim: true, maxlength: 100 },
  date: { type: String, required: true },
  message: { type: String, default: '', trim: true, maxlength: 1000 },
  status: { type: String, enum: ['pending','confirmed','cancelled'], default: 'pending' }
},{timestamps:true});
module.exports = mongoose.model('Booking', bookingSchema);
