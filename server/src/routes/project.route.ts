import { Router } from "express";
import {
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

// Get a single project by ID
router.get("/:projectId", authMiddleware, getOneProject);
router.patch("/:projectId", authMiddleware, updateUserInfo);


export default router;
