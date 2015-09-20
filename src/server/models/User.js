import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.ObjectId;
const UserSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  speaking: String,
  learning: String,
  recentChats: [{username: String, unread: {type: Boolean, default: true}}]
});

UserSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret.password;
    return ret;
  }
});

UserSchema.statics.findUserAndPushRecentChat = function({user, partner, unread}, callback) {
  this.update({username: user}, {
    $pull: {
      recentChats: {username: partner}
    }
  }).exec();

  this.update({username: user}, {
    $addToSet: {
      recentChats: {
        $each: [{username: partner, unread: unread}],
        $slice: -10
      }
    }
  }, callback);
};

export default mongoose.model('User', UserSchema);