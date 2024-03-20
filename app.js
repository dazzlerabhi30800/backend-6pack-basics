import express from "express";
import userRouter from "./routes/user.js";
import { config } from "dotenv";

// to access env variables
config({
  path: "./database/config.env",
});

export const app = express();

// middleware to access form data
app.use(express.json());
app.use("/users", userRouter);

app.get("/", (req, res) => {
  // res.send("Abhishek");
  res.json({ name: "Abhishek", status: 200 });
});
