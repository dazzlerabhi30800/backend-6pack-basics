import jwt from "jsonwebtoken";
// utils to set the cookie

export const setCookie = (user, res, message, statusCode = 200) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 15,
    })
    .json({ success: true, message });
};
