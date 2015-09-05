import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.ObjectId;
const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  speaking: String,
  learning: String,
  recentChats: [String]
});

userSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret.password;
    return ret;
  }
});

export default mongoose.model('User', userSchema);