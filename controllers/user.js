import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { setCookie } from "../utils/features.js";

export const getAllUsers = async (req, res) => {
  const user = await User.find({});
  res.json({ success: true, user, message: "Users Fetched" });
};

export const newUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return next(new ErrorHandler("User Already Exist", 404));

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    setCookie(user, res, "User Created", 201);
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email }).select("+password");
    if (!user) return next(new ErrorHandler("User not found", 404));

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return next(new ErrorHandler("invalid email or password", 404));

    setCookie(user, res, `Welcome Back ${user.name}`, 200);
  } catch (err) {
    next(err);
  }
};

export const getProfile = (req, res) => {
  res.status(200).json({ success: true, user: req.user });
};

export const logoutUser = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({ success: true, message: "User Logged Out" });
};
