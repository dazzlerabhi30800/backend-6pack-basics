import express from "express";
import path from "path";

const app = express();

app.use(express.static(path.join(path.resolve(), "public")));

// setting up view engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.json({
    page: "homePage",
    success: true,
    status: 200,
  });
});

// app.get("/send", (req, res) => {
//   // const filePath = path.resolve() + "/index.html";
//   res.sendFile(path.join(path.resolve(), "/index.html"));
// });

app.get("/send", (req, res) => {
  res.render("index", { name: "Abhishek" });
});

app.listen(5000, () => {
  console.log("server is working");
});
