import express from "express";
import { adminAuth, bothAuth } from "../middleware/checkAuth.js";
import {
  deleteUser,
  getAllUsers,
  restoreUser,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/allusers", bothAuth, getAllUsers);
router.patch("/:id/deleteuser", adminAuth, deleteUser);
router.patch("/:id/restoreUser", adminAuth, restoreUser);

export default router;
