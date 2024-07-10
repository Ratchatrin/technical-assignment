import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import User from "./model/user.model.js";
const app = express();
const PORT = process.env.PORT || 5050;
app.use(json());
app.use(cors());
mongoose
  .connect(
    "mongodb+srv://ratchatrin12:QpACmHJUWMCJBLIl@cluster0.cayleoy.mongodb.net/movies?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connect to Database");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to database:", error);
  });
app.post("/signIn", async (req, res) => {
  try {
    const checkUser = await User.findOne({ email: req.body.email });
    if (checkUser) {
      res.status(208).json("Email is Exist");
    } else {
      const user = await User.create(req.body);
      res.status(201).json(user);
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (user) {
      if (user.password === password) {
        res.status(200).json(user);
      } else {
        res.status(200).json({ message: "Incorrect password" });
      }
    } else {
      res.status(200).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});
app.get("/test", async (req, res) => {
  try {
    res.status(200).json("test");
  } catch (error) {
    console.log(error);
  }
});
