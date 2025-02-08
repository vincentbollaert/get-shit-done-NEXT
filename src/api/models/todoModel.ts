import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema(
  {
    todoName: {
      type: String,
      unique: true,
      required: [true, 'must have name'],
    },
    isDone: {
      type: Boolean,
      default: false,
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
        ret.todoId = ret._id;
        delete ret._id;
      },
    },
  },
);

const Todo = mongoose.models.Todo || mongoose.model('Todo', TodoSchema);
export default Todo;
