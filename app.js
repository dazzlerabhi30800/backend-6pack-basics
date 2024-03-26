import express from "express";
import userRouter from "./routes/user.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import taskRouter from "./routes/task.js";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

// to access env variables
config({
  path: "./database/config.env",
});

export const app = express();

// middleware to access form data
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL?.toString()],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    exposedHeaders: ["Set-Cookie"]
  }),
);

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

app.get("/", (req, res) => {
  // res.send("Abhishek");
  res.json({ name: "Abhishek", status: 200 });
});

app.use(errorMiddleware);
