import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    image: {
      type: {
        key: { type: String, required: true },
        url: { type: String, required: true },
      },
      required: false, // Image itself is not required
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
