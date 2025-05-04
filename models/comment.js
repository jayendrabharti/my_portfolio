import { Schema, model, models } from "mongoose";

const CommentSchema = new Schema({
  blogId: {
    type: Schema.Types.ObjectId,
    ref: "Blog",
    required: true,
  },
  name: {
    type: String,
    required: [true, "Name is required!"],
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
  },
  message: {
    type: String,
    required: [true, "Comment message is required!"],
  },
  parentCommentId: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
    default: null,
  },
  isApproved: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true,
});

const Comment = models.Comment || model("Comment", CommentSchema);
export default Comment;
