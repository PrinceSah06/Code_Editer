import { Router } from "express";
import {
  AddNewUser,
  createProject,
  getAllProjects,
  getOneProject,
} from "../contollers/project.controller";
import  authMiddleware from "../middleware/auth.middleware";
import { updateUser } from "../contollers/auth.controller";
import {updateUserInfo} from '../contollers/project.controller'
const router = Router();

// Create a new project
router.post("/", authMiddleware, createProject);

// Get all projects of logged-in user
router.get("/", authMiddleware, getAllProjects);
router.patch("/:projectId", authMiddleware, updateUserInfo);
router.get("/:projectId", authMiddleware, getOneProject);

router.patch(
  "/:projectId/add-user",
  authMiddleware,AddNewUser)

// Get a single project by ID


export default router;
