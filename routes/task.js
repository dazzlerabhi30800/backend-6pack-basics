import express from "express";
import {
  newTask,
  getMyTask,
  updateTask,
  deleteTask,
  startUpdateTask,
  completeUpdate,
} from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", isAuthenticated, newTask);
router.get("/my", isAuthenticated, getMyTask);
router
  .route("/:id")
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);

router.put("/edit/:id", startUpdateTask);
router.put("/complete/:id", completeUpdate);

export default router;
