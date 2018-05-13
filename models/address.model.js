const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new mongoose.Schema({
  street: {
    type: String
  },
  state: {
    type: String
  },
  city: {
    type: String
  },
  country: {
    type: String
  },
  zip: {
    type: String
  }
},
{
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      return ret;
    }
  }
});

const Address = mongoose.model('Address', addressSchema);
module.exports = Address;
