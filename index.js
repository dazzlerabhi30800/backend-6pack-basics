import express, { urlencoded } from "express";
import path from "path";

const app = express();
const users = [];

// this is also a middleware
app.use(express.static(path.join(path.resolve(), "public")));
// middlewares to access the data submitted by the form
app.use(urlencoded({ extended: true }));

// setting up view engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/success", (req, res) => {
  res.render("success");
});

app.get("/users", (req, res) => {
  res.json({ users });
});

// Post Routes
app.post("/contact", (req, res) => {
  users.push({ username: req.body.name, email: req.body.email });
  res.redirect("/success");
});

app.listen(5000, () => {
  console.log("server is running");
});
