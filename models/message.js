import { Schema, model, models } from "mongoose";

const MessageSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required!"],
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
  },
  subject: {
    type: String,
    required: [true, "Subject is required!"],
  },
  message: {
    type: String,
    required: [true, "Message content is required!"],
  },
  isRead: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true,
});

const Message = models.Message || model("Message", MessageSchema);
export default Message;
