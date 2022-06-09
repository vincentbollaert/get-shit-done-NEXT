import mongoose from 'mongoose';

const GroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'must have name'],
      unique: [true, 'must be unique'],
    },
    colorId: {
      type: String,
      required: [true, 'must have colorId'],
    },
    userId: {
      type: String,
      required: [true, 'must belong to a user'],
    },
  },
  {
    toJSON: {
      versionKey: false,
      transform(doc, ret) {
        ret.groupId = ret._id;
        delete ret._id;
      },
    },
  }
);

const Group = mongoose.models.Group || mongoose.model('Group', GroupSchema);
export default Group;
