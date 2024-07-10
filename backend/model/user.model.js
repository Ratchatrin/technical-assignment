import { Schema, model } from "mongoose";

const UserSchema = Schema({
  email: String,
  username: String,
  password: String,
  favorite: Array,
});

const User = model("User", UserSchema, "user");

export default User;
