import { Schema, model } from "mongoose";

const UserSchema = Schema({
  email: String,
  username: String,
  password: String,
});

const User = model("User", UserSchema, "user");

export default User;
