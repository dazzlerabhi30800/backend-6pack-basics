import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  newUser,
  specialFunc,
  updateUser,
} from "../controllers/user.js";

const router = express.Router();

router.get("/all", getAllUsers);

router.post("/new", newUser);

router.get("/special", specialFunc);

router.route("/userid/:id").get(getUserById).put(updateUser).delete(deleteUser);

// router.get("/userid/:id", getUserById);

// router.put("/userid/:id", updateUser);

// router.delete("/userid/:id", deleteUser);

export default router;
