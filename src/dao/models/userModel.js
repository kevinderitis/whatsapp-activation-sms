import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String
  },
  password: {
    type: String
  },
  balance: {
    type: Number,
    min: 0,
    default: 0
  }
});

const User = mongoose.model('User', userSchema);

export default User;
