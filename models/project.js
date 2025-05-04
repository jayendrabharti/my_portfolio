import { Schema, model, models } from "mongoose";

const ProjectSchema = new Schema({
  title: {
    type: String,
    required: [true, "Project title is required!"],
  },
  description: {
    type: String,
    required: [true, "Project description is required!"],
  },
  tags: {
    type: [String],
    default: [],
  },
  image: {
    type: String,
    default: "",
  },
  githubUrl: {
    type: String,
  },
  liveUrl: {
    type: String,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  slug: {
    type: String,
    required: [true, "Project slug is required!"],
    unique: true,
  }
}, {
  timestamps: true,
});

const Project = models.Project || model("Project", ProjectSchema);
export default Project;
