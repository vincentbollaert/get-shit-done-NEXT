import mongoose from 'mongoose';

export type TaskAttributes = {
  timestamp: string;
  name: string;
  group: string;
  time: number[];
  userId: string;
};

const TaskSchema = new mongoose.Schema(
  {
    timestamp: {
      type: String,
      required: [true, 'must have timestamp'],
    },
    name: {
      type: String,
      required: [true, 'must have name'],
    },
    group: {
      type: String,
      required: [true, 'must be grouped'],
    },
    time: [Number],
    userId: {
      type: String,
      required: [true, 'must belong to a user'],
    },
  },
  {
    toJSON: {
      versionKey: false,
      transform(doc, ret) {
        ret.taskId = ret._id;
        delete ret._id;
      },
    },
  }
);

const Task = mongoose.models.Task || mongoose.model('Task', TaskSchema);
export default Task;
