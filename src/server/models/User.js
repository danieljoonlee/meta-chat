import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: {
    type: String,
    select: false
  },
  speaking: String,
  learning: String
});

export default mongoose.model('User', userSchema);
