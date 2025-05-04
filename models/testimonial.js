import { Schema, model, models } from "mongoose";

const TestimonialSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required!"],
  },
  company: {
    type: String,
    default: "",
  },
  avatar: {
    type: String,
    default: "",
  },
  text: {
    type: String,
    required: [true, "Testimonial text is required!"],
  },
  url: {
    type: String,
  },
  isVisible: {
    type: Boolean,
    default: true,
  },
  datetime: {
    type: Date,
    default: Date.now(),
  }
}, {
  timestamps: true,
});

const Testimonial = models.Testimonial || model("Testimonial", TestimonialSchema);
export default Testimonial;
