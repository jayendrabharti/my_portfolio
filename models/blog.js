import { Schema, model, models } from "mongoose";

const BlogSchema = new Schema({
  title: {
    type: String,
    required: [true, "Blog title is required!"],
  },
  slug: {
    type: String,
    required: [true, "Slug is required!"],
    unique: true,
  },
  content: {
    type: Schema.Types.Mixed,
    required: [true, "Blog content is required!"],
  },
  displayContent: {
    type: String,
    default: "",
  },
  coverImage: {
    type: String,
    default: "",
  },
  tags: {
    type: [String],
    default: [],
  },
  comments: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }],
    default: []
  },
  datetime: {
    type: Date,
    default: Date.now(),
  },
  views: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

const Blog = models.Blog || model("Blog", BlogSchema);
export default Blog;
