import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.ObjectId;
const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  speaking: String,
  learning: String,
  recentChats: [{
    partner: String,
    chatId: ObjectId
  }]
});

export default mongoose.model('User', userSchema);
