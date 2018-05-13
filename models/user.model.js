const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    required: [true, 'Email is required'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    unique: true
  },
  name: {
    type: String,
    required: true,
  },
  birthDate: {
    type: String
  },
  address: {
    type: Schema.Types.ObjectId,
    ref: 'Address'
  },
},
{
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret.__v;
      delete ret._id;
      return ret;
    }
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
