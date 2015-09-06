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

userSchema.statics.findByIdAndPushRecentChat = function(id, newPartner, callback) {
  return this.findById(id, (err, user) => {
    user.recentChats = [newPartner]
      .concat([...user.recentChats].filter(partner => partner !== newPartner))
      .slice(0, 10);
    user.save(callback);
  });
};

export default mongoose.model('User', userSchema);