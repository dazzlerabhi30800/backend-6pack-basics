import express from "express";
import mongoose from "mongoose";

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017", {
    dbName: "backend",
  })
  .then(() => console.log("server is running"))
  .catch((err) => console.log(err));

// middleware to access form data
app.use(express.json());

const schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("visitors", schema);

// get endpoints

app.get("/", (req, res) => {
  // res.send("Abhishek");
  res.json({ name: "Abhishek", status: 200 });
});
app.get("/users/all", async (req, res) => {
  const user = await User.find({});
  console.log(req.query.keyword);
  res.json({ success: true, user });
});

app.get("/userid/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.json({ success: true, user });
});

// Post Endpoints
app.post("/users/new", async (req, res) => {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  res
    .status(201)
    .cookie("temp", name)
    .json({ success: true, message: "User created successfully" });
});

app.listen(4000, () => {
  console.log("server is working");
});
