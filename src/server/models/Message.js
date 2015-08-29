import mongoose from 'mongoose';

const messageSchema = mongoose.Schema({
  user1: String,
  user2: String,
  speaker: String,
  content: String
});

messageSchema.statics.findByUsers = function(u1, u2, cb) {
  const [user1, user2] = [u1, u2].sort();
  return this.find({user1, user2}, cb);
}

export default mongoose.model('Message', messageSchema);
