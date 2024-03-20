import express from "express";
import {
  getAllUsers,
  getUserById,
  newUser,
  specialFunc,
} from "../controllers/user.js";

const router = express.Router();

router.get("/all", getAllUsers);

router.post("/new", newUser);

router.get("/special", specialFunc);

router.post("/userid/:id", getUserById);

export default router;
