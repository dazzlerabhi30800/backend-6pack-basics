import express from "express";
import {
  getAllUsers,
  getProfile,
  loginUser,
  newUser,
  logoutUser,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", getAllUsers);

router.post("/new", newUser);

router.post("/login", loginUser);
router.get("/logout", logoutUser);

router.get("/me", isAuthenticated, getProfile);

export default router;
