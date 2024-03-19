import express, { urlencoded } from "express";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const app = express();
const users = [];

mongoose
  .connect("mongodb://localhost:27017", {
    dbName: "backend",
  })
  .then((c) => console.log("Database Connect"))
  .catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("Users", userSchema);

// this is also a middleware
app.use(express.static(path.join(path.resolve(), "public")));
// middlewares to access the data submitted by the form
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

// setting up view engine
app.set("view engine", "ejs");

const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const decoded = jwt.verify(token, "afjljflsjfljs");
    req.user = await User.findById(decoded._id);
    next();
  } else {
    res.redirect("/login");
  }
};

app.get("/", isAuthenticated, (req, res) => {
  res.render("logout", { name: req.user.name });
});

app.get("/success", (req, res) => {
  res.render("success");
});

app.get("/users", (req, res) => {
  res.json({ users });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

// Post Routes
app.post("/contact", (req, res) => {
  users.push({ username: req.body.name, email: req.body.email });
  res.redirect("/success");
});

app.post("/login", async (req, res) => {
  const { password, email } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    return res.redirect("/register");
  }
  // const isMatch = user.password === password;
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.render("login", { email, message: "Incorrect Password" });
  }
  // const user = await User.create({ name, email });
  const token = jwt.sign({ _id: user._id }, "afjljflsjfljs");
  res.cookie("token", token, {
    // can only access cookie on the server side not client side
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000),
  });
  res.redirect("/");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    return res.redirect("/login");
  }
  const hashedPass = await bcrypt.hash(password, 10);
  user = await User.create({ name, email, password: hashedPass });
  const token = jwt.sign({ _id: user._id }, "afjljflsjfljs");
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60),
  });
  res.redirect("/");
});

app.get("/logout", (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.redirect("/");
});

app.listen(5000, () => {
  console.log("server is running");
});
