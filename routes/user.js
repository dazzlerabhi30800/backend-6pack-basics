import express from "express";
import {
  getAllUsers,
  getProfile,
  loginUser,
  newUser,
  specialFunc,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", getAllUsers);

router.post("/new", newUser);

router.get("/special", specialFunc);

router.post("/login", loginUser);

router.get("/me", getProfile);

export default router;
