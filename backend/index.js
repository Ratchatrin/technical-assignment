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
app.post("/addFav/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const userFilter = await User.findById(userId);
    const moviesIndex = userFilter.favorite.findIndex((movies) => {
      return movies.id === req.body.id;
    });
    if (moviesIndex == -1) {
      const userUpdate = await User.findByIdAndUpdate(userId, {
        $push: { favorite: req.body },
      });
      res.status(200).json("Add Complete");
    } else {
      res.status(200).json("Already add");
    }
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
app.post("/delete/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const userFilter = await User.findById(userId);
    const movieId = req.body.id;
    const movieExists = userFilter.favorite.some(
      (movie) => movie.id === movieId
    );
    if (movieExists) {
      await User.findByIdAndUpdate(userId, {
        $pull: { favorite: { id: movieId } },
      });
      res.status(200).json("Delete Complete");
    } else {
      res.status(404).json("Movie not found in favorites");
    }
  } catch (error) {
    console.error("Error deleting item from favorites:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
app.put("/resetPassword", async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const checkUser = await User.findOne({ email: email });
    if (checkUser) {
      const newUser = await User.findByIdAndUpdate(checkUser._id, {
        $set: { password: newPassword },
      });
      res.status(200).json(newUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
    console.log(checkUser);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});
