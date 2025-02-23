import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      key: {
        type: String,
        required: false,
      },
      url: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true } // Adds createdAt & updatedAt automatically
);

const BlogModel = mongoose.model("Blog", blogSchema);

export default BlogModel;
