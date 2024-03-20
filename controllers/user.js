import { User } from "../models/user.js";

export const getAllUsers = async (req, res) => {
  const user = await User.find({});
  console.log(req.query.keyword);
  res.json({ success: true, user });
};

export const newUser = async (req, res) => {
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
  res.json({ success: true, message: "User Updated"});
};


export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.json({ success: true, message: "User Deleted"});
};