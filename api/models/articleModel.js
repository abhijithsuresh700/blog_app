import mongoose from "mongoose";
const { Schema } = mongoose;

const articleSchema = new Schema({
  heading: {
    type: String,
    required: true,
  },
  readTime: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  categories: [
    {
      type: String,
      required: true,
    },
  ],
  image: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  newest: {
    type: Boolean,
    default: false,
  },
  trending: {
    type: Boolean,
    default: false,
  },
},{timeStamps: true});

export default mongoose.model("Article", articleSchema);
