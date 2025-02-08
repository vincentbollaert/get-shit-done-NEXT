import mongoose from 'mongoose';
import { Password } from '../utils/password';

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      versionKey: false,
      transform(doc, ret) {
        ret.userId = ret._id;
        delete ret._id;
        delete ret.password;
      },
    },
  },
);

// use regular fn because this points to document you are accessing
// use provided done cb because mongoose support for async await is limited
UserSchema.pre('save', async function (done) {
  // only hash if new. not on email change, for instances
  if (this.isModified('password')) {
    const hashedPassword = await Password.toHash(this.get('password'));
    this.set('password', hashedPassword);
  }
  done();
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;
