const mongoose = require('mongoose');

const Schema = mongoose.Schema
const stockSchema = new Schema({
  stock: String,
  shares: Number,
}, {collection: 'stock'}) 

module.exports = mongoose.model('Stock', stockSchema)