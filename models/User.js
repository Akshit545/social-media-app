import mongoose from "mongoose";

const Schema = mongoose.Schema;

// user schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
});

export default mongoose.model("User", userSchema);
// in mongodb collection will be named as users 