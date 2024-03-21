import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { setCookie } from "../utils/features.js";

export const getAllUsers = async (req, res) => {
  const user = await User.find({});
  console.log(req.query.keyword);
  res.json({ success: true, user });
};

export const newUser = async (req, res) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user)
    return res
      .status(404)
      .json({ success: false, message: "User Already Exist" });
  const hashedPassword = await bcrypt.hash(password, 10);
  user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  setCookie(user, res, "User Created", 201);
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res
      .status(404)
      .json({ success: false, message: "Password didn't match!" });
  }
  setCookie(user, res, `Welcome Back ${user.name}`, 200);
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.json({ success: true, user });
};

export const specialFunc = (req, res) => {
  res.json({ success: true, message: "Just Checking" });
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.json({ success: true, message: "User Updated" });
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.json({ success: true, message: "User Deleted" });
};
