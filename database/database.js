import mongoose from "mongoose";

export const connectDB = () =>
  mongoose
    .connect(process.env.URL, {
      dbName: "backend",
    })
    .then(() => console.log("server is running"))
    .catch((err) => console.log(err));
