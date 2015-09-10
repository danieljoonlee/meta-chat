import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.ObjectId;
const UserSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  speaking: String,
  learning: String,
  recentChats: [String]
});

UserSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret.password;
    return ret;
  }
});

UserSchema.statics.findUserAndPushRecentChat = function(username, newPartner, callback) {
  return this.findOne({username}, (err, user) => {
    user.recentChats = [newPartner]
      .concat([...user.recentChats].filter(partner => partner !== newPartner))
      .slice(0, 10);
    user.save(callback);
  });
};

export default mongoose.model('User', UserSchema);