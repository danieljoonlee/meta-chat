import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: {
    type: String,
    select: false
  }
});

export default mongoose.model('User', userSchema);
