import express from "express";
import userRouter from "./routes/user.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import taskRouter from './routes/task.js';

// to access env variables
config({
  path: "./database/config.env",
});

export const app = express();

// middleware to access form data
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

app.get("/", (req, res) => {
  // res.send("Abhishek");
  res.json({ name: "Abhishek", status: 200 });
});
