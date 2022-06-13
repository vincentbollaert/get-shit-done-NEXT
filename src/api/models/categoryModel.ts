import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema(
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
        ret.categoryId = ret._id;
        delete ret._id;
      },
    },
  }
);

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);
export default Category;
